import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, Coffee } from 'lucide-react';
import { Link } from 'wouter';
import { useSmoothScroll } from '@/hooks/useScrollAnimation';
import { contactInfo, logoUrl } from '@/lib/data';

const footerLinks = [
  { label: 'Home', href: 'hero' },
  { label: 'About', href: 'about' },
  { label: 'Coffee Products', href: 'coffeeproducts' },
  { label: 'Commercial Machines', href: 'commercial' },
  { label: 'Home Machines', href: 'home-machines' },
  { label: 'Maintenance', href: 'maintenance' },
  { label: 'Contact', href: 'contact' },
];

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

export default function Footer() {
  const { scrollTo } = useSmoothScroll();

  return (
    <footer className="relative overflow-hidden pt-16 pb-8 bg-cafe-beige">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-coffee-pattern opacity-[0.03] dark:opacity-[0.02]" />
      
      {/* Gradient orb */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(30, 65%, 45%, 0.08), transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <motion.a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('hero');
              }}
              className="inline-flex items-center gap-3 mb-6 group"
              whileHover={{ scale: 1.02 }}
              data-testid="link-footer-logo"
            >
              <img
                src={logoUrl}
                alt="Café Gourmand"
                className="h-10 w-auto transition-all"
                style={{ filter: 'brightness(0) invert(75%) sepia(100%) saturate(500%) hue-rotate(-5deg) brightness(105%)' }}
              />
            </motion.a>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Indulge in the rich, aromatic world of Café Gourmand, where we bring you the finest coffee blends roasted in Venice, Italy.
            </p>
            
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-background/50 dark:bg-background/30 border border-border/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                    data-testid={`link-social-${social.label.toLowerCase()}`}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gradient-to-r from-primary to-transparent rounded-full" />
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <motion.button
                    onClick={() => scrollTo(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                    whileHover={{ x: 4 }}
                    data-testid={`link-footer-${link.href}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                    {link.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gradient-to-r from-primary to-transparent rounded-full" />
              Products
            </h4>
            <ul className="space-y-2.5">
              <li>
                <motion.button
                  onClick={() => scrollTo('coffeeproducts')}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                  whileHover={{ x: 4 }}
                  data-testid="link-footer-blends"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                  Coffee Blends
                </motion.button>
              </li>
              <li>
                <motion.button
                  onClick={() => scrollTo('commercial')}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                  whileHover={{ x: 4 }}
                  data-testid="link-footer-commercial"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                  Commercial Machines
                </motion.button>
              </li>
              <li>
                <motion.button
                  onClick={() => scrollTo('home-machines')}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                  whileHover={{ x: 4 }}
                  data-testid="link-footer-home"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                  Home Machines
                </motion.button>
              </li>
              <li>
                <motion.button
                  onClick={() => scrollTo('maintenance')}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                  whileHover={{ x: 4 }}
                  data-testid="link-footer-service"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                  Maintenance Service
                </motion.button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gradient-to-r from-primary to-transparent rounded-full" />
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li>
                <motion.a
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm group"
                  whileHover={{ x: 4 }}
                  data-testid="link-footer-phone"
                >
                  <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-4 h-4 text-primary" />
                  </span>
                  {contactInfo.phone}
                </motion.a>
              </li>
              <li>
                <motion.a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm group"
                  whileHover={{ x: 4 }}
                  data-testid="link-footer-email"
                >
                  <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-4 h-4 text-primary" />
                  </span>
                  {contactInfo.email}
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="https://www.google.com/maps/search/?api=1&query=DIFC+Liberty+House+Dubai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors text-sm group"
                  whileHover={{ x: 4 }}
                  data-testid="link-footer-address"
                >
                  <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="w-4 h-4 text-primary" />
                  </span>
                  <span className="pt-1.5">{contactInfo.address}</span>
                </motion.a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground/70 text-sm flex items-center gap-2">
              <Coffee className="w-4 h-4 text-primary/50" />
              &copy; {new Date().getFullYear()} Café Gourmand. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy-policy">
                <span className="text-muted-foreground/70 hover:text-primary transition-colors cursor-pointer" data-testid="link-footer-privacy">
                  Privacy Policy
                </span>
              </Link>
              <Link href="/terms-of-service">
                <span className="text-muted-foreground/70 hover:text-primary transition-colors cursor-pointer" data-testid="link-footer-terms">
                  Terms of Service
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
