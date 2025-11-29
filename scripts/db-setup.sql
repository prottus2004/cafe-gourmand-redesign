-- Café Gourmand Dubai - Database Setup Script
-- Run this in your Neon PostgreSQL console

-- Create cart_items table
CREATE TABLE IF NOT EXISTS cart_items (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
  session_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_price REAL NOT NULL,
  product_image TEXT NOT NULL,
  product_type TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cart_items_session ON cart_items(session_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_product ON cart_items(product_id);

-- Optional: Create users table (if needed later)
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Optional: Create products table (products are currently served from frontend)
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  subtitle TEXT,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  price REAL,
  images TEXT[] NOT NULL,
  features TEXT[],
  specifications JSONB,
  in_stock BOOLEAN DEFAULT true
);
