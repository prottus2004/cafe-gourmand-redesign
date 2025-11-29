import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../_lib/storage';
import { z } from 'zod';
import { parse, serialize } from 'cookie';

const updateCartSchema = z.object({
  quantity: z.number().int().min(0),
});

function getSessionId(req: VercelRequest): string {
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  let sessionId = cookies.sessionId;
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
  return sessionId;
}

function setSessionCookie(res: VercelResponse, sessionId: string) {
  const cookie = serialize('sessionId', sessionId, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60,
    sameSite: 'lax',
    path: '/',
  });
  res.setHeader('Set-Cookie', cookie);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { productId } = req.query;
  
  if (!productId || typeof productId !== 'string') {
    return res.status(400).json({ error: 'Product ID required' });
  }

  const sessionId = getSessionId(req);
  setSessionCookie(res, sessionId);

  try {
    if (req.method === 'PATCH') {
      const { quantity } = updateCartSchema.parse(req.body);
      const item = await storage.updateCartItem(sessionId, productId, quantity);

      if (quantity <= 0) {
        return res.json({ message: 'Item removed from cart' });
      } else if (!item) {
        return res.status(404).json({ error: 'Item not found in cart' });
      } else {
        return res.json(item);
      }
    }

    if (req.method === 'DELETE') {
      const removed = await storage.removeFromCart(sessionId, productId);
      if (!removed) {
        return res.status(404).json({ error: 'Item not found in cart' });
      }
      return res.json({ message: 'Item removed from cart' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid request data', details: error.errors });
    }
    console.error('Cart item error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
