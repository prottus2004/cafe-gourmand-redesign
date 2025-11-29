import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getChatResponse } from './_lib/chatbot';
import { z } from 'zod';

const chatMessageSchema = z.object({
  message: z.string().min(1).max(1000),
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
    const { message } = chatMessageSchema.parse(req.body);
    const chatResponse = getChatResponse(message);

    return res.json({
      response: chatResponse.response,
      suggestions: chatResponse.suggestions,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid message', details: error.errors });
    }
    console.error('Chat error:', error);
    return res.status(500).json({ error: 'Failed to process message' });
  }
}
