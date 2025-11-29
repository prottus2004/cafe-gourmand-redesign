import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Product Categories
export type ProductCategory = 'coffee-blend' | 'commercial-machine' | 'home-machine' | 'grinder';

// Coffee Product Schema
export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  subtitle: text("subtitle"),
  description: text("description").notNull(),
  category: text("category").notNull(),
  price: real("price"),
  images: text("images").array().notNull(),
  features: text("features").array(),
  specifications: json("specifications"),
  inStock: boolean("in_stock").default(true),
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// Cart Item Schema
export const cartItems = pgTable("cart_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id").notNull(),
  productId: text("product_id").notNull(),
  quantity: integer("quantity").notNull().default(1),
});

export const insertCartItemSchema = createInsertSchema(cartItems).omit({ id: true });
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type CartItem = typeof cartItems.$inferSelect;

// Contact Message Schema
export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({ id: true });
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

// User Schema (existing)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Product data with real information from the cafe website
export interface CoffeeBlend {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  price: number;
  number: number;
}

export interface CommercialMachine {
  id: string;
  name: string;
  image: string;
  features: string[];
  price: number;
}

export interface HomeMachine {
  id: string;
  name: string;
  images: string[];
  description: string;
  features: { title: string; description: string }[];
  beverages?: string[];
  specifications?: { [key: string]: string };
  warranty: string;
  shipping: string;
  price: number;
}

// Cart state type
export interface CartState {
  items: { product: CoffeeBlend | CommercialMachine | HomeMachine; quantity: number; type: string }[];
  isOpen: boolean;
}
