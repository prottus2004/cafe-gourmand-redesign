import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useCart, type CartItemType } from '@/lib/cartContext';
import { useToast } from '@/hooks/use-toast';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string, name: string) => void;
}

function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex gap-4 py-4 border-b border-border last:border-0"
    >
      {/* Product image */}
      <div className="w-20 h-20 rounded-md bg-muted overflow-hidden flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain p-1"
        />
      </div>

      {/* Product info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-foreground truncate">{item.name}</h4>
        <p className="text-sm text-muted-foreground capitalize">{item.type}</p>
        <p className="text-primary font-semibold mt-1">
          AED {item.price.toLocaleString()}
        </p>
      </div>

      {/* Quantity controls */}
      <div className="flex flex-col items-end gap-2">
        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6 text-muted-foreground hover:text-destructive"
          onClick={() => onRemove(item.id, item.name)}
          data-testid={`button-remove-${item.id}`}
        >
          <Trash2 className="w-4 h-4" />
        </Button>

        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="outline"
            className="h-7 w-7"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            data-testid={`button-decrease-${item.id}`}
          >
            <Minus className="w-3 h-3" />
          </Button>
          <motion.span
            key={item.quantity}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="w-8 text-center font-medium text-foreground"
          >
            {item.quantity}
          </motion.span>
          <Button
            size="icon"
            variant="outline"
            className="h-7 w-7"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            data-testid={`button-increase-${item.id}`}
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function CartDrawer() {
  const { items, isOpen, isLoading, closeCart, totalItems, totalPrice, clearCart, updateQuantity, removeItem } = useCart();
  const { toast } = useToast();

  const handleClearCart = () => {
    clearCart();
    toast({
      title: 'Cart cleared',
      description: 'All items have been removed from your cart.',
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const handleRemove = (id: string, name: string) => {
    removeItem(id);
    toast({
      title: 'Item removed',
      description: `${name} has been removed from your cart.`,
    });
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            onClick={closeCart}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-background z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-serif font-bold text-foreground">
                  Shopping Cart
                </h2>
                <motion.span
                  key={totalItems}
                  initial={{ scale: 1.3 }}
                  animate={{ scale: 1 }}
                  className="bg-primary text-primary-foreground text-xs font-medium px-2 py-0.5 rounded-full"
                >
                  {totalItems}
                </motion.span>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={closeCart}
                data-testid="button-close-cart"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Cart items */}
            <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-4 py-4 border-b border-border">
                      <Skeleton className="w-20 h-20 rounded-md" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/4" />
                        <Skeleton className="h-4 w-1/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
                    <p className="text-lg font-medium text-foreground mb-1">
                      Your cart is empty
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Add some products to get started
                    </p>
                    <Button
                      className="mt-6"
                      onClick={closeCart}
                      data-testid="button-continue-shopping"
                    >
                      Continue Shopping
                    </Button>
                  </motion.div>
                </div>
              ) : (
                <div>
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemove}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 border-t border-border bg-card">
                {/* Subtotal */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground">Subtotal</span>
                  <motion.span
                    key={totalPrice}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="text-2xl font-bold text-foreground"
                  >
                    AED {totalPrice.toLocaleString()}
                  </motion.span>
                </div>

                <p className="text-xs text-muted-foreground mb-4">
                  Shipping and taxes calculated at checkout
                </p>

                {/* Actions */}
                <div className="space-y-2">
                  <Link href="/checkout" onClick={closeCart}>
                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                      size="lg"
                      data-testid="button-checkout"
                    >
                      Proceed to Checkout
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleClearCart}
                    data-testid="button-clear-cart"
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
