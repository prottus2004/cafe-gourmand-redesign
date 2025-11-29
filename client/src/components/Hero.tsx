import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Coffee, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSmoothScroll, useParallax } from '@/hooks/useScrollAnimation';
import { heroContent } from '@/lib/data';

export default function Hero() {
  const { scrollTo } = useSmoothScroll();
  const { ref: parallaxRef, offset } = useParallax(0.3);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <section
      id="hero"
      ref={(el) => {
        if (el) {
          (parallaxRef as React.MutableRefObject<HTMLElement | null>).current = el;
          (containerRef as React.MutableRefObject<HTMLElement | null>).current = el;
        }
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cafe-beige"
    >
      {/* Background with parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${offset}px)` }}
      >
        {/* Theme-aware gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-background to-background z-10" />
        
        {/* Coffee pattern background */}
        <div className="absolute inset-0 bg-coffee-pattern opacity-[0.08] dark:opacity-[0.15]" />
        
        {/* Animated gradient orbs - using theme colors */}
        <motion.div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[100px] bg-primary/10 dark:bg-primary/20"
          style={{
            transform: `translateX(${mousePosition.x * 60}px) translateY(${mousePosition.y * 60}px)`,
            transition: 'transform 0.4s ease-out',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[80px] bg-accent/10 dark:bg-accent/20"
          style={{
            transform: `translateX(${mousePosition.x * -50}px) translateY(${mousePosition.y * -50}px)`,
            transition: 'transform 0.45s ease-out',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.1, 0.15],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Center accent orb */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] bg-primary/5 dark:bg-primary/10"
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 dark:bg-primary/40 rounded-full"
            style={{
              left: `${8 + (i * 7) % 85}%`,
              top: `${15 + (i * 8) % 70}%`,
            }}
            animate={{
              y: [-15, 15, -15],
              x: [-8, 8, -8],
              opacity: [0.2, 0.5, 0.2],
              scale: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Welcome badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 dark:bg-primary/15 border border-primary/20 dark:border-primary/25 mb-8 overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
              />
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                {heroContent.welcome}
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="block">
                <motion.span
                  className="inline-block text-foreground"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  Select Your
                </motion.span>
              </div>
              <div className="block">
                <motion.span
                  className="inline-block text-primary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  Perfect Brew
                </motion.span>
              </div>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {heroContent.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  onClick={() => scrollTo('coffeeproducts')}
                  className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-lg"
                  data-testid="button-products-cta"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Coffee className="w-5 h-5" />
                    Our Products
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollTo('contact')}
                  className="border-2 border-border text-foreground hover:bg-muted px-8 py-6 text-lg font-semibold rounded-xl"
                  data-testid="button-contact-cta"
                >
                  Contact Us
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="flex items-center gap-6 mt-10 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-muted-foreground text-sm">Premium Italian Coffee</span>
            </motion.div>
          </motion.div>

          {/* Hero Image - Cursor Responsive */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * -8}deg) rotateY(${mousePosition.x * 8}deg)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <div className="relative perspective-2000">
              {/* Glow behind image */}
              <motion.div
                className="absolute inset-0 bg-primary/10 dark:bg-primary/15 blur-3xl scale-110"
                animate={{
                  opacity: [0.15, 0.3, 0.15],
                  scale: [1.1, 1.2, 1.1],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              {/* Floating coffee image */}
              <motion.div
                className="relative z-10"
                style={{
                  transform: `translateX(${mousePosition.x * 20}px) translateY(${mousePosition.y * 20}px)`,
                  transition: 'transform 0.15s ease-out',
                }}
                animate={{
                  y: [0, -15, 0],
                  rotateZ: [0, 2, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <img
                  src={heroContent.heroImage}
                  alt="Premium Coffee"
                  className="w-full max-w-lg mx-auto drop-shadow-2xl"
                />
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -top-10 -right-10 w-36 h-36 rounded-full blur-2xl bg-primary/15 dark:bg-primary/25"
                style={{
                  transform: `translateX(${mousePosition.x * -30}px) translateY(${mousePosition.y * -30}px)`,
                  transition: 'transform 0.2s ease-out',
                }}
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute -bottom-5 -left-10 w-44 h-44 rounded-full blur-2xl bg-accent/15 dark:bg-accent/25"
                style={{
                  transform: `translateX(${mousePosition.x * -25}px) translateY(${mousePosition.y * -25}px)`,
                  transition: 'transform 0.25s ease-out',
                }}
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.2, 0.35, 0.2],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Coffee beans floating */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-5 bg-primary/40 dark:bg-primary/50 rounded-full shadow-lg"
                  style={{
                    top: `${18 + i * 14}%`,
                    left: `${8 + i * 18}%`,
                    transform: `rotate(${45 + i * 15}deg) translateX(${mousePosition.x * (10 + i * 5)}px) translateY(${mousePosition.y * (10 + i * 5)}px)`,
                    transition: `transform ${0.1 + i * 0.05}s ease-out`,
                  }}
                  animate={{
                    y: [0, -22, 0],
                    rotate: [45 + i * 15, 90 + i * 15, 45 + i * 15],
                    opacity: [0.35, 0.6, 0.35],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <motion.button
          onClick={() => scrollTo('about')}
          className="flex flex-col items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          data-testid="button-scroll-down"
        >
          <span className="text-sm font-medium tracking-wider uppercase">Discover More</span>
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-primary/40 flex items-start justify-center pt-2"
          >
            <motion.div
              className="w-1.5 h-2.5 bg-primary rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
}
