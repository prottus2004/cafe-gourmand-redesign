import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/lib/cartContext';
import { useSmoothScroll, useScrollProgress } from '@/hooks/useScrollAnimation';
import { logoUrl, contactInfo } from '@/lib/data';

const navLinks = [
  { href: 'hero', label: 'Home' },
  { href: 'about', label: 'About' },
  { href: 'coffeeproducts', label: 'Coffee Products' },
  { href: 'commercial', label: 'Commercial Machines' },
  { href: 'home-machines', label: 'Home Machines' },
  { href: 'maintenance', label: 'Maintenance' },
  { href: 'contact', label: 'Contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart, totalItems } = useCart();
  const { scrollTo } = useSmoothScroll();
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    scrollTo(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        style={{ scaleX: scrollProgress }}
      />

      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-lg shadow-lg border-b border-border/50'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('hero');
              }}
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid="link-logo"
            >
              <img
                src={logoUrl}
                alt="Café Gourmand"
                className="h-10 md:h-12 w-auto brightness-0 dark:brightness-100"
              />
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="px-3 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors animated-underline"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  data-testid={`link-nav-${link.href}`}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Phone - Desktop only */}
              <motion.a
                href={`tel:${contactInfo.phone}`}
                className="hidden md:flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                whileHover={{ scale: 1.05 }}
                data-testid="link-phone"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden xl:inline">{contactInfo.phone}</span>
              </motion.a>

              {/* Cart Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleCart}
                  className="relative"
                  data-testid="button-cart"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <AnimatePresence>
                    {totalItems > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1"
                      >
                        <Badge
                          variant="default"
                          className="h-5 min-w-5 flex items-center justify-center p-0 text-xs"
                        >
                          {totalItems}
                        </Badge>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-background/98 backdrop-blur-lg border-t border-border/50"
            >
              <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="w-full text-left px-4 py-3 text-base font-medium text-primary hover:text-primary/80 hover:bg-muted/50 rounded-md transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    data-testid={`link-mobile-nav-${link.href}`}
                  >
                    {link.label}
                  </motion.button>
                ))}
                <motion.a
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-center gap-2 px-4 py-3 text-base font-medium text-primary"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  data-testid="link-mobile-phone"
                >
                  <Phone className="w-5 h-5" />
                  {contactInfo.phone}
                </motion.a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
