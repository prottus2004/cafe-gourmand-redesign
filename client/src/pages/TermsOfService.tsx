import { motion } from 'framer-motion';
import { ArrowLeft, FileText, ShoppingCart, Truck, RefreshCw, CreditCard, Scale, AlertTriangle, Mail } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const sections = [
  {
    icon: FileText,
    title: 'Acceptance of Terms',
    content: 'By accessing and using the Café Gourmand website and services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use our services.',
  },
  {
    icon: ShoppingCart,
    title: 'Products and Services',
    content: 'Café Gourmand offers premium coffee products, commercial espresso machines, home coffee machines, and maintenance services. All products are subject to availability. We reserve the right to discontinue any product at any time. Prices are subject to change without notice.',
  },
  {
    icon: CreditCard,
    title: 'Payment Terms',
    content: 'All payments must be made in UAE Dirhams (AED). We accept major credit cards, debit cards, and bank transfers. Payment is required at the time of purchase. For commercial equipment, we may offer financing options subject to credit approval.',
  },
  {
    icon: Truck,
    title: 'Shipping and Delivery',
    content: 'We offer delivery services across the UAE. Delivery times may vary depending on the product and location. Commercial machines may require professional installation, which will be arranged separately. Shipping costs are calculated at checkout based on the delivery location.',
  },
  {
    icon: RefreshCw,
    title: 'Returns and Refunds',
    content: 'Coffee products may be returned within 7 days of purchase if unopened and in original condition. Coffee machines may be returned within 14 days if unused and in original packaging. Refunds will be processed within 14 business days. Shipping costs are non-refundable.',
  },
  {
    icon: Scale,
    title: 'Warranty',
    content: 'All coffee machines come with manufacturer warranty as specified in the product description. Warranty covers manufacturing defects and does not cover damage caused by misuse, improper maintenance, or unauthorized modifications. Warranty claims must be submitted with proof of purchase.',
  },
  {
    icon: AlertTriangle,
    title: 'Limitation of Liability',
    content: 'Café Gourmand shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our products or services. Our liability is limited to the amount paid for the product or service in question.',
  },
];

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-secondary via-background to-muted overflow-hidden">
        <div className="absolute inset-0 bg-coffee-pattern opacity-5" />
        <motion.div
          className="absolute -top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link href="/">
            <Button variant="ghost" className="mb-8" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                Legal
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6">
              Terms of <span className="text-primary">Service</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl">
              Please read these terms and conditions carefully before using our website and services. These terms govern your use of Café Gourmand's products and services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 md:p-8 hover:shadow-lg transition-shadow" data-testid={`card-terms-${index}`}>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <section.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-serif font-bold text-foreground mb-3">
                        {section.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

            {/* Governing Law */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Card className="p-6 md:p-8 bg-primary/5 border-primary/20" data-testid="card-governing-law">
                <h2 className="text-xl font-serif font-bold text-foreground mb-3">
                  Governing Law
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  These terms and conditions are governed by and construed in accordance with the laws of the United Arab Emirates. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Dubai, UAE.
                </p>
              </Card>
            </motion.div>

            {/* Changes to Terms */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Card className="p-6 md:p-8" data-testid="card-changes">
                <h2 className="text-xl font-serif font-bold text-foreground mb-3">
                  Changes to Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Café Gourmand reserves the right to modify these terms at any time. Changes will be effective immediately upon posting on this page. Your continued use of our services after any changes constitutes acceptance of the new terms.
                </p>
              </Card>
            </motion.div>
          </div>

          {/* Contact */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <p className="text-muted-foreground mb-4">
              If you have any questions about our Terms of Service, please contact us.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="mailto:sales@cafegourmandae.com">
                <Button variant="outline" data-testid="button-contact-email">
                  <Mail className="w-4 h-4 mr-2" />
                  sales@cafegourmandae.com
                </Button>
              </a>
              <a href="tel:+971521020008">
                <Button variant="outline" data-testid="button-contact-phone">
                  +971 52 102 000 8
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
