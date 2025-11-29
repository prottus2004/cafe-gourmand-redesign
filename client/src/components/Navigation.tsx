import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, Phone, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/lib/cartContext';
import { useSmoothScroll, useScrollProgress } from '@/hooks/useScrollAnimation';
import { logoUrl, contactInfo } from '@/lib/data';
import ThemeToggle from './ThemeToggle';

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
  const [activeSection, setActiveSection] = useState('hero');
  const { toggleCart, totalItems } = useCart();
  const { scrollTo } = useSmoothScroll();
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = navLinks.map(link => document.getElementById(link.href));
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].href);
          break;
        }
      }
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
      {/* Animated Progress bar with gradient */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[60] origin-left"
        style={{ 
          scaleX: scrollProgress,
          background: 'linear-gradient(90deg, hsl(30, 65%, 45%), hsl(35, 70%, 55%), hsl(40, 75%, 60%))',
        }}
      />

      <motion.header
        className={`fixed top-1 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? 'pt-0'
            : 'pt-2'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <motion.div
            className={`relative overflow-hidden rounded-2xl transition-all duration-500 ${
              isScrolled
                ? 'bg-background/80 dark:bg-transparent shadow-xl dark:shadow-none border border-border/50 dark:border-border/20'
                : 'bg-gradient-to-r from-secondary/95 via-secondary/90 to-secondary/95 dark:from-transparent dark:via-transparent dark:to-transparent shadow-2xl dark:shadow-none border border-primary/20 dark:border-border/10'
            }`}
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
            layout
          >
            {/* Animated gradient overlay */}
            <motion.div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                background: isScrolled 
                  ? 'none'
                  : 'linear-gradient(135deg, transparent 0%, hsl(30, 65%, 45%, 0.1) 50%, transparent 100%)',
              }}
              animate={{
                opacity: isScrolled ? 0 : [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            
            {/* Shimmer effect */}
            {!isScrolled && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                }}
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
              />
            )}

            <div className="relative z-10 px-4 sm:px-6">
              <div className="flex items-center justify-between h-16 md:h-18">
                {/* Logo */}
                <motion.a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('hero');
                  }}
                  className="flex-shrink-0 relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid="link-logo"
                >
                  <motion.div
                    className="absolute -inset-2 bg-primary/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <img
                    src={logoUrl}
                    alt="Café Gourmand"
                    className="relative h-9 md:h-11 w-auto transition-all duration-300"
                    style={{ filter: 'brightness(0) invert(75%) sepia(100%) saturate(500%) hue-rotate(-5deg) brightness(105%)' }}
                  />
                </motion.a>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-0.5">
                  {navLinks.map((link) => (
                    <motion.button
                      key={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                        activeSection === link.href
                          ? 'text-primary'
                          : isScrolled
                            ? 'text-foreground/80 hover:text-primary'
                            : 'text-primary-foreground/90 hover:text-primary'
                      }`}
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                      data-testid={`link-nav-${link.href}`}
                    >
                      {link.label}
                      {activeSection === link.href && (
                        <motion.div
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                          layoutId="activeSection"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </nav>

                {/* Right side actions */}
                <div className="flex items-center gap-1.5 md:gap-3">
                  {/* Phone - Desktop only */}
                  <motion.a
                    href={`tel:${contactInfo.phone}`}
                    className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isScrolled
                        ? 'text-primary hover:bg-primary/10'
                        : 'text-primary-foreground hover:bg-primary-foreground/10'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    data-testid="link-phone"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="hidden xl:inline">{contactInfo.phone}</span>
                  </motion.a>

                  {/* Theme Toggle */}
                  <ThemeToggle />

                  {/* Cart Button */}
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleCart}
                      className={`relative ${
                        isScrolled ? '' : 'text-primary-foreground hover:text-primary-foreground/80'
                      }`}
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
                              className="h-5 min-w-5 flex items-center justify-center p-0 text-xs bg-primary"
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
                    className={`lg:hidden ${
                      isScrolled ? '' : 'text-primary-foreground hover:text-primary-foreground/80'
                    }`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    data-testid="button-mobile-menu"
                  >
                    <AnimatePresence mode="wait">
                      {isMobileMenuOpen ? (
                        <motion.div
                          key="close"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <X className="w-5 h-5" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="menu"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Menu className="w-5 h-5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
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
                  className="lg:hidden border-t border-border/30 overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-primary/10 pointer-events-none"
                  />
                  <nav className="relative px-4 py-3 flex flex-col gap-1">
                    {navLinks.map((link, index) => (
                      <motion.button
                        key={link.href}
                        onClick={() => handleNavClick(link.href)}
                        className={`w-full text-left px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 ${
                          activeSection === link.href
                            ? 'bg-primary/10 text-primary'
                            : isScrolled 
                              ? 'text-foreground hover:bg-muted/50 hover:text-primary'
                              : 'text-primary-foreground hover:bg-primary-foreground/10'
                        }`}
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
                      className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-xl transition-all ${
                        isScrolled
                          ? 'text-primary hover:bg-primary/10'
                          : 'text-primary-foreground hover:bg-primary-foreground/10'
                      }`}
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
          </motion.div>
        </div>
      </motion.header>
    </>
  );
}
