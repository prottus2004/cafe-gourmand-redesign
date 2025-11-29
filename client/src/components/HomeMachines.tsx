import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ChevronLeft, ChevronRight, Check, Truck, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCart } from '@/lib/cartContext';
import { homeMachines } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

interface ImageGalleryProps {
  images: string[];
  name: string;
}

function ImageGallery({ images, name }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted to-muted/50 rounded-md">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${name} - Image ${currentIndex + 1}`}
            className="w-full h-full object-contain p-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <Button
              size="icon"
              variant="secondary"
              className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              onClick={prevImage}
              data-testid="button-gallery-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              onClick={nextImage}
              data-testid="button-gallery-next"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 justify-center">
          {images.map((img, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                i === currentIndex
                  ? 'border-primary shadow-md'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid={`button-thumbnail-${i}`}
            >
              <img
                src={img}
                alt={`${name} thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}

interface MachineShowcaseProps {
  machine: typeof homeMachines[0];
  index: number;
  isVisible: boolean;
  reversed?: boolean;
}

function MachineShowcase({ machine, index, isVisible, reversed }: MachineShowcaseProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: machine.id,
      name: machine.name,
      price: machine.price,
      image: machine.images[0],
      type: 'home',
    });
    toast({
      title: 'Added to cart',
      description: `${machine.name} has been added to your cart.`,
    });
  };

  const displayedFeatures = showAllFeatures ? machine.features : machine.features.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      className="mb-16 last:mb-0"
    >
      <Card
        className="group relative overflow-visible bg-card border-card-border shadow-lg"
        data-testid={`card-home-machine-${machine.id}`}
      >
        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 p-6 lg:p-10 ${reversed ? 'lg:direction-rtl' : ''}`}>
          {/* Image gallery */}
          <div className={`${reversed ? 'lg:order-2 lg:direction-ltr' : ''}`}>
            <ImageGallery images={machine.images} name={machine.name} />
          </div>

          {/* Content */}
          <div className={`flex flex-col ${reversed ? 'lg:order-1 lg:direction-ltr' : ''}`}>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="secondary">For Offices and Homes</Badge>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  Made in Italy
                </Badge>
              </div>

              <h3 className="text-2xl lg:text-4xl font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {machine.name}
              </h3>

              <p className="text-muted-foreground mb-6">
                {machine.description}
              </p>

              {/* Beverages list */}
              {machine.beverages && machine.beverages.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">
                    {machine.beverages.length} Beverages at Touch of Button
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {machine.beverages.map((beverage, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {beverage}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                  Key Features
                </h4>
                <ul className="space-y-3">
                  <AnimatePresence mode="sync">
                    {displayedFeatures.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <div>
                          <span className="font-medium text-foreground">{feature.title}</span>
                          <p className="text-sm text-muted-foreground mt-0.5">{feature.description}</p>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
                
                {machine.features.length > 4 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAllFeatures(!showAllFeatures)}
                    className="text-primary hover:text-primary/80 mt-3 p-0 h-auto"
                    data-testid={`button-show-features-${machine.id}`}
                  >
                    {showAllFeatures ? 'Show Less Features' : `Show All ${machine.features.length} Features`}
                  </Button>
                )}
              </div>

              {/* Warranty and shipping */}
              <div className="flex flex-wrap gap-4 mb-6 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Warranty: {machine.warranty}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Truck className="w-4 h-4 text-primary" />
                  <span>{machine.shipping}</span>
                </div>
              </div>
            </div>

            {/* Price and CTA */}
            <div className="pt-6 border-t border-border">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Price</span>
                  <div className="text-3xl lg:text-4xl font-bold text-primary">
                    AED {machine.price.toLocaleString()}
                  </div>
                </div>
                
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg w-full sm:w-auto"
                  data-testid={`button-add-cart-${machine.id}`}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-50" />
      </Card>
    </motion.div>
  );
}

export default function HomeMachines() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section
      id="home-machines"
      ref={ref}
      className="relative py-24 md:py-32 bg-muted/30 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-coffee-pattern opacity-5" />
      <motion.div
        className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 15, repeat: Infinity }}
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
            For Offices and Homes
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Coffee <span className="text-primary">Machines</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Premium automatic espresso machines designed for the perfect home or office coffee experience.
          </p>
        </motion.div>

        {/* Machines showcase */}
        <div>
          {homeMachines.map((machine, index) => (
            <MachineShowcase
              key={machine.id}
              machine={machine}
              index={index}
              isVisible={isVisible}
              reversed={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
