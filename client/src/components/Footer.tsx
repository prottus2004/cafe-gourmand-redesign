import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
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
    <footer className="relative bg-secondary pt-16 pb-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-coffee-pattern opacity-5" />
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity }}
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
              className="inline-block mb-6"
              whileHover={{ scale: 1.05 }}
              data-testid="link-footer-logo"
            >
              <img
                src={logoUrl}
                alt="Café Gourmand"
                className="h-12 w-auto brightness-0 invert"
              />
            </motion.a>
            <p className="text-secondary-foreground/70 text-sm mb-6">
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
                    className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center text-secondary-foreground/70 hover:bg-primary hover:text-primary-foreground transition-colors"
                    whileHover={{ scale: 1.1 }}
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
            <h4 className="text-lg font-serif font-bold text-secondary-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <motion.button
                    onClick={() => scrollTo(link.href)}
                    className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm"
                    whileHover={{ x: 5 }}
                    data-testid={`link-footer-${link.href}`}
                  >
                    {link.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-serif font-bold text-secondary-foreground mb-4">
              Products
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollTo('coffeeproducts')}
                  className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm"
                  data-testid="link-footer-blends"
                >
                  Coffee Blends
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('commercial')}
                  className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm"
                  data-testid="link-footer-commercial"
                >
                  Commercial Machines
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('home-machines')}
                  className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm"
                  data-testid="link-footer-home"
                >
                  Home Machines
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('maintenance')}
                  className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm"
                  data-testid="link-footer-service"
                >
                  Maintenance Service
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-serif font-bold text-secondary-foreground mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-secondary-foreground/70 hover:text-primary transition-colors text-sm"
                  data-testid="link-footer-phone"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  {contactInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-3 text-secondary-foreground/70 hover:text-primary transition-colors text-sm"
                  data-testid="link-footer-email"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=DIFC+Liberty+House+Dubai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-secondary-foreground/70 hover:text-primary transition-colors text-sm"
                  data-testid="link-footer-address"
                >
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  {contactInfo.address}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-secondary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-secondary-foreground/50 text-sm">
              &copy; {new Date().getFullYear()} Café Gourmand. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy-policy">
                <span className="text-secondary-foreground/50 hover:text-primary transition-colors cursor-pointer" data-testid="link-footer-privacy">
                  Privacy Policy
                </span>
              </Link>
              <Link href="/terms-of-service">
                <span className="text-secondary-foreground/50 hover:text-primary transition-colors cursor-pointer" data-testid="link-footer-terms">
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
