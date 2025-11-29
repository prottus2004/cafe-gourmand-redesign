import { motion } from 'framer-motion';
import { ShoppingCart, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useScrollAnimation, useMouseTilt } from '@/hooks/useScrollAnimation';
import { useCart } from '@/lib/cartContext';
import { coffeeBlends } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: typeof coffeeBlends[0];
  index: number;
  isVisible: boolean;
}

function ProductCard({ product, index, isVisible }: ProductCardProps) {
  const { ref, tilt } = useMouseTilt();
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      type: 'coffee',
    });
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
    >
      <div
        ref={ref}
        className="perspective-1000"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <Card
          className="group relative h-full overflow-visible bg-card border-card-border transition-all duration-300 hover:shadow-xl"
          data-testid={`card-product-${product.id}`}
        >
          {/* Product number badge */}
          <div className="absolute -top-3 -left-3 z-20">
            <motion.div
              className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg"
              whileHover={{ scale: 1.1, rotate: 10 }}
            >
              {product.number}
            </motion.div>
          </div>

          {/* Image container */}
          <div className="relative aspect-square overflow-hidden rounded-t-md bg-gradient-to-br from-muted/50 to-muted">
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            
            {/* Overlay on hover */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 pointer-events-none"
            >
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart();
                }}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 pointer-events-auto"
                data-testid={`button-add-cart-${product.id}`}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>

            {/* Decorative glow */}
            <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="mb-2">
              <Badge variant="secondary" className="text-xs">
                {product.subtitle}
              </Badge>
            </div>
            
            <h3 className="text-xl font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
              {product.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary">
                AED {product.price}
              </span>
              
              <Button
                size="icon"
                variant="ghost"
                onClick={handleAddToCart}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                data-testid={`button-quick-add-${product.id}`}
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Bottom accent line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-primary origin-left"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
        </Card>
      </div>
    </motion.div>
  );
}

export default function CoffeeProducts() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section
      id="coffeeproducts"
      ref={ref}
      className="relative py-24 md:py-32 bg-muted/30 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-coffee-pattern opacity-5" />
      <motion.div
        className="absolute -left-20 top-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{
          x: [0, 30, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Our Premium Selection
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Coffee <span className="text-primary">Products</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Café Gourmand Blends result from the research of the best quality of raw materials and the most accurate roasting. Proudly, our coffee blends are carefully selected and roasted in Venice, Italy.
          </p>
        </motion.div>

        {/* Products grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {coffeeBlends.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
