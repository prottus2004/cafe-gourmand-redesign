import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

export interface CartItemType {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  type: 'coffee' | 'commercial' | 'home';
}

interface CartApiItem {
  id: string;
  sessionId: string;
  productId: string;
  productName: string;
  productPrice: number;
  productImage: string;
  productType: 'coffee' | 'commercial' | 'home';
  quantity: number;
}

interface CartApiResponse {
  items: CartApiItem[];
  totalItems: number;
  totalPrice: number;
}

interface CartContextType {
  items: CartItemType[];
  isOpen: boolean;
  isLoading: boolean;
  addItem: (item: Omit<CartItemType, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  // Fetch cart from backend
  const { data: cartData, isLoading } = useQuery<CartApiResponse>({
    queryKey: ['/api/cart'],
    staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: true,
  });

  // Transform API items to cart items
  const items: CartItemType[] = cartData?.items?.map((item) => ({
    id: item.productId,
    name: item.productName,
    price: item.productPrice,
    image: item.productImage,
    quantity: item.quantity,
    type: item.productType,
  })) || [];

  const totalItems = cartData?.totalItems || 0;
  const totalPrice = cartData?.totalPrice || 0;

  // Add to cart mutation
  const addMutation = useMutation({
    mutationFn: async (item: Omit<CartItemType, 'quantity'>) => {
      return apiRequest('POST', '/api/cart', {
        productId: item.id,
        productName: item.name,
        productPrice: item.price,
        productImage: item.image,
        productType: item.type,
        quantity: 1,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    },
  });

  // Update cart item mutation
  const updateMutation = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      return apiRequest('PATCH', `/api/cart/${productId}`, { quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    },
  });

  // Remove from cart mutation
  const removeMutation = useMutation({
    mutationFn: async (productId: string) => {
      return apiRequest('DELETE', `/api/cart/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    },
  });

  // Clear cart mutation
  const clearMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('DELETE', '/api/cart');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    },
  });

  const addItem = useCallback((item: Omit<CartItemType, 'quantity'>) => {
    addMutation.mutate(item);
    setIsOpen(true);
  }, [addMutation]);

  const removeItem = useCallback((id: string) => {
    removeMutation.mutate(id);
  }, [removeMutation]);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeMutation.mutate(id);
      return;
    }
    updateMutation.mutate({ productId: id, quantity });
  }, [updateMutation, removeMutation]);

  const clearCart = useCallback(() => {
    clearMutation.mutate();
  }, [clearMutation]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        isLoading,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
