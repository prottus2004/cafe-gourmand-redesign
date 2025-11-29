import { motion } from 'framer-motion';
import { ChevronDown, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSmoothScroll, useParallax } from '@/hooks/useScrollAnimation';
import { heroContent } from '@/lib/data';

export default function Hero() {
  const { scrollTo } = useSmoothScroll();
  const { ref: parallaxRef, offset } = useParallax(0.3);

  return (
    <section
      id="hero"
      ref={parallaxRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${offset}px)` }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/95 via-secondary/80 to-secondary/70 z-10" />
        
        {/* Coffee pattern background */}
        <div className="absolute inset-0 bg-coffee-pattern opacity-30" />
        
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6"
            >
              <Coffee className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary-foreground">
                {heroContent.welcome}
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-primary-foreground leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {heroContent.title.split(' ').map((word, index) => (
                <motion.span
                  key={index}
                  className={`inline-block ${index === 2 || index === 3 ? 'text-primary' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  {word}{' '}
                </motion.span>
              ))}
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl mx-auto lg:mx-0"
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
              <Button
                size="lg"
                onClick={() => scrollTo('coffeeproducts')}
                className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-md shadow-lg"
                data-testid="button-products-cta"
              >
                <span className="relative z-10">Our Products</span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo('contact')}
                className="bg-transparent border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 text-lg font-semibold rounded-md backdrop-blur-sm"
                data-testid="button-contact-cta"
              >
                Contact Us
              </Button>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="relative perspective-2000">
              {/* Floating coffee image */}
              <motion.div
                className="relative z-10"
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
                className="absolute -top-10 -right-10 w-32 h-32 bg-primary/30 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute -bottom-5 -left-10 w-40 h-40 bg-accent/40 rounded-full blur-2xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.4, 0.7, 0.4],
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
                  className="absolute w-4 h-6 bg-coffee-800 rounded-full"
                  style={{
                    top: `${20 + i * 15}%`,
                    left: `${10 + i * 20}%`,
                    transform: 'rotate(45deg)',
                  }}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [45, 90, 45],
                    opacity: [0.6, 0.9, 0.6],
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
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <motion.button
          onClick={() => scrollTo('about')}
          className="flex flex-col items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          data-testid="button-scroll-down"
        >
          <span className="text-sm font-medium">Scroll Down</span>
          <ChevronDown className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </section>
  );
}
