import { db } from './db';
import { cartItems, contactMessages, users } from '../../shared/schema';
import { eq, and } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import type { InsertContactMessage, ContactMessage, InsertUser, User } from '../../shared/schema';

interface CartItemStorage {
  id: string;
  sessionId: string;
  productId: string;
  productName: string;
  productPrice: number;
  productImage: string;
  productType: 'coffee' | 'commercial' | 'home';
  quantity: number;
}

interface CartItemDB {
  id: string;
  sessionId: string;
  productId: string;
  productName: string;
  productPrice: number;
  productImage: string;
  productType: string;
  quantity: number;
}

export const storage = {
  async getCartItems(sessionId: string): Promise<CartItemStorage[]> {
    const items = await db.query.cartItems.findMany({
      where: eq(cartItems.sessionId, sessionId),
    });
    return items.map((item: CartItemDB) => ({
      ...item,
      productType: item.productType as 'coffee' | 'commercial' | 'home',
    }));
  },

  async addToCart(
    sessionId: string,
    item: Omit<CartItemStorage, 'id' | 'sessionId'>
  ): Promise<CartItemStorage> {
    const existingItems = await db.query.cartItems.findMany({
      where: and(
        eq(cartItems.sessionId, sessionId),
        eq(cartItems.productId, item.productId)
      ),
    });

    if (existingItems.length > 0) {
      const existingItem = existingItems[0];
      const newQuantity = existingItem.quantity + item.quantity;
      
      await db
        .update(cartItems)
        .set({ quantity: newQuantity })
        .where(eq(cartItems.id, existingItem.id));

      return {
        ...existingItem,
        quantity: newQuantity,
        productType: existingItem.productType as 'coffee' | 'commercial' | 'home',
      };
    }

    const id = randomUUID();
    const newItem = {
      id,
      sessionId,
      productId: item.productId,
      productName: item.productName,
      productPrice: item.productPrice,
      productImage: item.productImage,
      productType: item.productType,
      quantity: item.quantity,
    };

    await db.insert(cartItems).values(newItem);
    
    return {
      ...newItem,
      productType: item.productType,
    };
  },

  async updateCartItem(
    sessionId: string,
    productId: string,
    quantity: number
  ): Promise<CartItemStorage | undefined> {
    const items = await db.query.cartItems.findMany({
      where: and(
        eq(cartItems.sessionId, sessionId),
        eq(cartItems.productId, productId)
      ),
    });

    if (items.length === 0) return undefined;

    const item = items[0];

    if (quantity <= 0) {
      await db.delete(cartItems).where(eq(cartItems.id, item.id));
      return undefined;
    }

    await db
      .update(cartItems)
      .set({ quantity })
      .where(eq(cartItems.id, item.id));

    return {
      ...item,
      quantity,
      productType: item.productType as 'coffee' | 'commercial' | 'home',
    };
  },

  async removeFromCart(sessionId: string, productId: string): Promise<boolean> {
    const items = await db.query.cartItems.findMany({
      where: and(
        eq(cartItems.sessionId, sessionId),
        eq(cartItems.productId, productId)
      ),
    });

    if (items.length === 0) return false;

    await db.delete(cartItems).where(eq(cartItems.id, items[0].id));
    return true;
  },

  async clearCart(sessionId: string): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.sessionId, sessionId));
  },

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const newMessage = { ...message, id };
    await db.insert(contactMessages).values(newMessage);
    return newMessage;
  },

  async getContactMessages(): Promise<ContactMessage[]> {
    return await db.query.contactMessages.findMany();
  },
};
