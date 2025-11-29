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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Multi-layer gradient background */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${offset}px)` }}
      >
        {/* Rich gradient overlay - browns to amber to cream */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f0a] via-[#2d1810] to-[#3d2518] z-10" />
        
        {/* Secondary gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-900/20 to-orange-800/30 z-11" />
        
        {/* Top gradient accent */}
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-amber-700/20 via-transparent to-transparent z-12" />
        
        {/* Bottom warm glow */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-orange-900/30 via-transparent to-transparent z-12" />
        
        {/* Coffee pattern background */}
        <div className="absolute inset-0 bg-coffee-pattern opacity-20" />
        
        {/* Animated mesh gradient */}
        <motion.div
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(ellipse at ${50 + mousePosition.x * 20}% ${50 + mousePosition.y * 20}%, rgba(180, 120, 60, 0.3), transparent 60%)`,
            transition: 'background 0.5s ease-out',
          }}
        />
        
        {/* Large animated gradient orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[100px]"
          style={{
            background: 'radial-gradient(circle, rgba(180, 120, 60, 0.4), transparent 70%)',
            transform: `translateX(${mousePosition.x * 80}px) translateY(${mousePosition.y * 80}px)`,
            transition: 'transform 0.4s ease-out',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[80px]"
          style={{
            background: 'radial-gradient(circle, rgba(200, 150, 80, 0.35), transparent 70%)',
            transform: `translateX(${mousePosition.x * -60}px) translateY(${mousePosition.y * -60}px)`,
            transition: 'transform 0.45s ease-out',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.25, 0.4],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Accent orb */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(139, 90, 43, 0.25), transparent 60%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/60 rounded-full"
            style={{
              left: `${5 + (i * 5) % 90}%`,
              top: `${10 + (i * 7) % 80}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + (i % 4),
              repeat: Infinity,
              delay: i * 0.2,
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
            {/* Welcome badge with shimmer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-600/30 via-orange-500/20 to-amber-600/30 border border-amber-500/40 mb-8 overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-amber-100">
                {heroContent.welcome}
              </span>
            </motion.div>

            {/* Main heading with enhanced styling */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {heroContent.title.split(' ').map((word, index) => (
                <motion.span
                  key={index}
                  className={`inline-block ${
                    index === 2 || index === 3 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500' 
                      : 'text-amber-50'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  style={{
                    textShadow: index === 2 || index === 3 ? 'none' : '0 2px 20px rgba(0,0,0,0.3)',
                  }}
                >
                  {word}{' '}
                </motion.span>
              ))}
            </motion.h1>

            {/* Description with enhanced readability */}
            <motion.p
              className="text-lg md:text-xl text-amber-100/80 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {heroContent.description}
            </motion.p>

            {/* CTA Buttons with premium styling */}
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
                  className="group relative overflow-hidden bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 hover:from-amber-500 hover:via-orange-400 hover:to-amber-500 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-xl shadow-amber-900/30 border border-amber-400/20"
                  data-testid="button-products-cta"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Coffee className="w-5 h-5" />
                    Our Products
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
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
                  className="bg-white/5 border-2 border-amber-200/30 text-amber-50 hover:bg-amber-50/10 hover:border-amber-200/50 px-8 py-6 text-lg font-semibold rounded-xl backdrop-blur-md"
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
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-amber-200/70 text-sm">Premium Italian Coffee</span>
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
                className="absolute inset-0 bg-gradient-to-r from-amber-500/30 via-orange-400/20 to-amber-500/30 blur-3xl scale-110"
                animate={{
                  opacity: [0.4, 0.6, 0.4],
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
                  style={{
                    filter: `drop-shadow(${mousePosition.x * 15}px ${mousePosition.y * 15}px 30px rgba(0,0,0,0.4)) drop-shadow(0 0 60px rgba(180, 120, 60, 0.3))`,
                  }}
                />
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-2xl"
                style={{
                  background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4), transparent 70%)',
                  transform: `translateX(${mousePosition.x * -30}px) translateY(${mousePosition.y * -30}px)`,
                  transition: 'transform 0.2s ease-out',
                }}
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute -bottom-5 -left-10 w-48 h-48 rounded-full blur-2xl"
                style={{
                  background: 'radial-gradient(circle, rgba(234, 179, 8, 0.35), transparent 70%)',
                  transform: `translateX(${mousePosition.x * -25}px) translateY(${mousePosition.y * -25}px)`,
                  transition: 'transform 0.25s ease-out',
                }}
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
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-5 bg-gradient-to-br from-amber-800 to-amber-950 rounded-full shadow-lg"
                  style={{
                    top: `${15 + i * 14}%`,
                    left: `${5 + i * 18}%`,
                    transform: `rotate(${45 + i * 15}deg) translateX(${mousePosition.x * (10 + i * 5)}px) translateY(${mousePosition.y * (10 + i * 5)}px)`,
                    transition: `transform ${0.1 + i * 0.05}s ease-out`,
                  }}
                  animate={{
                    y: [0, -25, 0],
                    rotate: [45 + i * 15, 90 + i * 15, 45 + i * 15],
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

      {/* Scroll indicator with enhanced styling */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <motion.button
          onClick={() => scrollTo('about')}
          className="flex flex-col items-center gap-3 text-amber-200/60 hover:text-amber-100 transition-colors group"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          data-testid="button-scroll-down"
        >
          <span className="text-sm font-medium tracking-wider uppercase">Discover More</span>
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-amber-400/40 flex items-start justify-center pt-2"
          >
            <motion.div
              className="w-1.5 h-2.5 bg-amber-400 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
}
