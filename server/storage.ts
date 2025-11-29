import { type User, type InsertUser, type InsertContactMessage, type ContactMessage } from "@shared/schema";
import { randomUUID } from "crypto";

// Cart item type for in-memory storage
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

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Cart operations
  getCartItems(sessionId: string): Promise<CartItemStorage[]>;
  addToCart(sessionId: string, item: Omit<CartItemStorage, 'id' | 'sessionId'>): Promise<CartItemStorage>;
  updateCartItem(sessionId: string, productId: string, quantity: number): Promise<CartItemStorage | undefined>;
  removeFromCart(sessionId: string, productId: string): Promise<boolean>;
  clearCart(sessionId: string): Promise<void>;
  
  // Contact operations
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private cartItems: Map<string, CartItemStorage>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.users = new Map();
    this.cartItems = new Map();
    this.contactMessages = new Map();
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Cart operations
  async getCartItems(sessionId: string): Promise<CartItemStorage[]> {
    return Array.from(this.cartItems.values()).filter(
      (item) => item.sessionId === sessionId
    );
  }

  async addToCart(
    sessionId: string,
    item: Omit<CartItemStorage, 'id' | 'sessionId'>
  ): Promise<CartItemStorage> {
    // Check if item already exists
    const existingItem = Array.from(this.cartItems.values()).find(
      (i) => i.sessionId === sessionId && i.productId === item.productId
    );

    if (existingItem) {
      existingItem.quantity += item.quantity;
      return existingItem;
    }

    const id = randomUUID();
    const cartItem: CartItemStorage = { ...item, id, sessionId };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItem(
    sessionId: string,
    productId: string,
    quantity: number
  ): Promise<CartItemStorage | undefined> {
    const item = Array.from(this.cartItems.values()).find(
      (i) => i.sessionId === sessionId && i.productId === productId
    );

    if (!item) return undefined;

    if (quantity <= 0) {
      this.cartItems.delete(item.id);
      return undefined;
    }

    item.quantity = quantity;
    return item;
  }

  async removeFromCart(sessionId: string, productId: string): Promise<boolean> {
    const item = Array.from(this.cartItems.values()).find(
      (i) => i.sessionId === sessionId && i.productId === productId
    );

    if (!item) return false;

    this.cartItems.delete(item.id);
    return true;
  }

  async clearCart(sessionId: string): Promise<void> {
    const items = Array.from(this.cartItems.entries());
    for (const [id, item] of items) {
      if (item.sessionId === sessionId) {
        this.cartItems.delete(id);
      }
    }
  }

  // Contact operations
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const contactMessage: ContactMessage = { ...message, id };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
}

export const storage = new MemStorage();
