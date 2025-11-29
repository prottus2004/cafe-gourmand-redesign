import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";
import { getChatResponse } from "./chatbot";

// Cart item schema for validation
const addToCartSchema = z.object({
  productId: z.string(),
  productName: z.string(),
  productPrice: z.number(),
  productImage: z.string(),
  productType: z.enum(['coffee', 'commercial', 'home']),
  quantity: z.number().int().positive().default(1),
});

const updateCartSchema = z.object({
  quantity: z.number().int().min(0),
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Get session ID from request (using a simple cookie-based approach)
  const getSessionId = (req: Request): string => {
    let sessionId = req.cookies?.sessionId;
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
    }
    return sessionId;
  };

  // Set session cookie in response
  const setSessionCookie = (res: Response, sessionId: string) => {
    res.cookie('sessionId', sessionId, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: 'lax',
    });
  };

  // ================== CART ROUTES ==================

  // Get cart items
  app.get('/api/cart', async (req: Request, res: Response) => {
    try {
      const sessionId = getSessionId(req);
      setSessionCookie(res, sessionId);
      
      const items = await storage.getCartItems(sessionId);
      
      const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = items.reduce(
        (sum, item) => sum + item.productPrice * item.quantity,
        0
      );

      res.json({
        items,
        totalItems,
        totalPrice,
      });
    } catch (error) {
      console.error('Error getting cart:', error);
      res.status(500).json({ error: 'Failed to get cart' });
    }
  });

  // Add item to cart
  app.post('/api/cart', async (req: Request, res: Response) => {
    try {
      const sessionId = getSessionId(req);
      setSessionCookie(res, sessionId);
      
      const validatedData = addToCartSchema.parse(req.body);
      
      const item = await storage.addToCart(sessionId, validatedData);
      
      res.status(201).json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Invalid request data', details: error.errors });
      } else {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'Failed to add to cart' });
      }
    }
  });

  // Update cart item quantity
  app.patch('/api/cart/:productId', async (req: Request, res: Response) => {
    try {
      const sessionId = getSessionId(req);
      setSessionCookie(res, sessionId);
      
      const { productId } = req.params;
      const { quantity } = updateCartSchema.parse(req.body);
      
      const item = await storage.updateCartItem(sessionId, productId, quantity);
      
      if (quantity <= 0) {
        res.json({ message: 'Item removed from cart' });
      } else if (!item) {
        res.status(404).json({ error: 'Item not found in cart' });
      } else {
        res.json(item);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Invalid request data', details: error.errors });
      } else {
        console.error('Error updating cart:', error);
        res.status(500).json({ error: 'Failed to update cart' });
      }
    }
  });

  // Remove item from cart
  app.delete('/api/cart/:productId', async (req: Request, res: Response) => {
    try {
      const sessionId = getSessionId(req);
      setSessionCookie(res, sessionId);
      
      const { productId } = req.params;
      
      const removed = await storage.removeFromCart(sessionId, productId);
      
      if (!removed) {
        res.status(404).json({ error: 'Item not found in cart' });
      } else {
        res.json({ message: 'Item removed from cart' });
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      res.status(500).json({ error: 'Failed to remove from cart' });
    }
  });

  // Clear cart
  app.delete('/api/cart', async (req: Request, res: Response) => {
    try {
      const sessionId = getSessionId(req);
      setSessionCookie(res, sessionId);
      
      await storage.clearCart(sessionId);
      
      res.json({ message: 'Cart cleared' });
    } catch (error) {
      console.error('Error clearing cart:', error);
      res.status(500).json({ error: 'Failed to clear cart' });
    }
  });

  // ================== CONTACT ROUTES ==================

  // Submit contact message
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      const message = await storage.createContactMessage(validatedData);
      
      res.status(201).json({
        success: true,
        message: 'Your message has been received. We will get back to you soon!',
        id: message.id,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Invalid request data', details: error.errors });
      } else {
        console.error('Error submitting contact message:', error);
        res.status(500).json({ error: 'Failed to submit message' });
      }
    }
  });

  // ================== PRODUCT ROUTES ==================
  // Products are served from static data on the frontend, 
  // but we can add API endpoints if needed

  // ================== CHATBOT ROUTES ==================

  // Chat message schema for validation
  const chatMessageSchema = z.object({
    message: z.string().min(1).max(1000),
  });

  // Process chat message
  app.post('/api/chat', async (req: Request, res: Response) => {
    try {
      const { message } = chatMessageSchema.parse(req.body);
      
      const chatResponse = getChatResponse(message);
      
      res.json({
        response: chatResponse.response,
        suggestions: chatResponse.suggestions,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Invalid message', details: error.errors });
      } else {
        console.error('Error processing chat message:', error);
        res.status(500).json({ error: 'Failed to process message' });
      }
    }
  });

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  return httpServer;
}
