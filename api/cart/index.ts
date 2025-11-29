import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../_lib/storage';
import { z } from 'zod';
import { parse, serialize } from 'cookie';

const addToCartSchema = z.object({
  productId: z.string(),
  productName: z.string(),
  productPrice: z.number(),
  productImage: z.string(),
  productType: z.enum(['coffee', 'commercial', 'home']),
  quantity: z.number().int().positive().default(1),
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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const sessionId = getSessionId(req);
  setSessionCookie(res, sessionId);

  try {
    if (req.method === 'GET') {
      const items = await storage.getCartItems(sessionId);
      const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = items.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);
      return res.json({ items, totalItems, totalPrice });
    }

    if (req.method === 'POST') {
      const validatedData = addToCartSchema.parse(req.body);
      const item = await storage.addToCart(sessionId, validatedData);
      return res.status(201).json(item);
    }

    if (req.method === 'DELETE') {
      await storage.clearCart(sessionId);
      return res.json({ message: 'Cart cleared' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid request data', details: error.errors });
    }
    console.error('Cart error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
