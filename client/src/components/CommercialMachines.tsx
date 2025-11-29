import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCart } from '@/lib/cartContext';
import { commercialMachines } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

interface MachineCardProps {
  machine: typeof commercialMachines[0];
  index: number;
  isVisible: boolean;
}

function MachineCard({ machine, index, isVisible }: MachineCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem({
      id: machine.id,
      name: machine.name,
      price: machine.price,
      image: machine.image,
      type: 'commercial',
    });
    toast({
      title: 'Added to cart',
      description: `${machine.name} has been added to your cart.`,
    });
  };

  const displayedFeatures = isExpanded ? machine.features : machine.features.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.15 }}
    >
      <Card
        className="group relative h-full overflow-visible bg-card border-card-border transition-all duration-500 hover:shadow-2xl"
        data-testid={`card-machine-${machine.id}`}
      >
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image section */}
          <div className="relative aspect-square md:aspect-auto overflow-hidden bg-gradient-to-br from-muted to-muted/50">
            <motion.div
              className="absolute inset-0 flex items-center justify-center p-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={machine.image}
                alt={machine.name}
                className="w-full h-full object-contain drop-shadow-lg"
                loading="lazy"
              />
            </motion.div>

            {/* Price badge */}
            <div className="absolute top-4 right-4">
              <Badge className="bg-primary text-primary-foreground text-lg px-3 py-1 shadow-lg">
                AED {machine.price.toLocaleString()}
              </Badge>
            </div>

            {/* Decorative gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content section */}
          <div className="p-6 lg:p-8 flex flex-col">
            <div className="flex-1">
              <Badge variant="secondary" className="mb-3">
                Commercial
              </Badge>
              
              <h3 className="text-2xl lg:text-3xl font-serif font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                {machine.name}
              </h3>

              {/* Features list */}
              <ul className="space-y-2 mb-4">
                <AnimatePresence mode="sync">
                  {displayedFeatures.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>

              {/* Expand/collapse button */}
              {machine.features.length > 4 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-primary hover:text-primary/80 p-0 h-auto"
                  data-testid={`button-expand-${machine.id}`}
                >
                  {isExpanded ? (
                    <>
                      Show Less <ChevronUp className="w-4 h-4 ml-1" />
                    </>
                  ) : (
                    <>
                      Show More ({machine.features.length - 4} more) <ChevronDown className="w-4 h-4 ml-1" />
                    </>
                  )}
                </Button>
              )}
            </div>

            {/* Add to cart button */}
            <div className="mt-6 pt-4 border-t border-border">
              <Button
                onClick={handleAddToCart}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                data-testid={`button-add-cart-${machine.id}`}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary to-accent origin-left"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.4 }}
        />
      </Card>
    </motion.div>
  );
}

export default function CommercialMachines() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section
      id="commercial"
      ref={ref}
      className="relative py-24 md:py-32 bg-background overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-coffee-pattern opacity-5" />
      <motion.div
        className="absolute top-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 12, repeat: Infinity }}
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
            For Restaurants, Hotels and Coffee Shops
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Commercial <span className="text-primary">Machines</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional-grade espresso machines and grinders designed for high-volume commercial environments.
          </p>
        </motion.div>

        {/* Machines grid */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {commercialMachines.map((machine, index) => (
            <MachineCard
              key={machine.id}
              machine={machine}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
