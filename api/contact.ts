import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from './_lib/storage';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(1),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const validatedData = contactSchema.parse(req.body);
    const message = await storage.createContactMessage(validatedData);

    return res.status(201).json({
      success: true,
      message: 'Your message has been received. We will get back to you soon!',
      id: message.id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid request data', details: error.errors });
    }
    console.error('Contact error:', error);
    return res.status(500).json({ error: 'Failed to submit message' });
  }
}
