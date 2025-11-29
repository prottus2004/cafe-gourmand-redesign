import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Lock, Cookie, Mail, FileText, Users } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const sections = [
  {
    icon: Users,
    title: 'Information Collection and Use',
    content: 'Café Gourmand collects personal information when you register on our site, place an order, subscribe to our newsletter, or fill out a form. The information collected may include your name, email address, mailing address, phone number, or credit card information.',
  },
  {
    icon: FileText,
    title: 'Use of Information',
    content: 'The information we collect from you may be used to process transactions, send periodic emails regarding your order or other products and services, improve customer service, personalize your experience, and administer promotions, surveys, or other site features.',
  },
  {
    icon: Lock,
    title: 'Protection of Information',
    content: 'We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.',
  },
  {
    icon: Cookie,
    title: 'Cookies',
    content: "Café Gourmand uses cookies to enhance your experience on our website. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your web browser (if you allow) that enable the site's or service provider's systems to recognize your browser and capture and remember certain information.",
  },
  {
    icon: Shield,
    title: 'Disclosure to Third Parties',
    content: 'Café Gourmand does not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, as long as those parties agree to keep this information confidential.',
  },
  {
    icon: Mail,
    title: 'Third-Party Links',
    content: 'Occasionally, at our discretion, we may include or offer third-party products or services on our website. These third-party sites have separate and independent privacy policies. We, therefore, have no responsibility or liability for the content and activities of these linked sites.',
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-secondary via-background to-muted overflow-hidden">
        <div className="absolute inset-0 bg-coffee-pattern opacity-5" />
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
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
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                Legal
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6">
              Privacy <span className="text-primary">Policy</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl">
              Café Gourmand is committed to protecting your privacy. This Privacy Policy outlines the types of personal information that is received and collected by Café Gourmand and how it is used.
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
                <Card className="p-6 md:p-8 hover:shadow-lg transition-shadow" data-testid={`card-policy-${index}`}>
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

            {/* Consent Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card className="p-6 md:p-8 bg-primary/5 border-primary/20" data-testid="card-consent">
                <h2 className="text-xl font-serif font-bold text-foreground mb-3">
                  Consent
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  By using our site, you consent to our website's privacy policy.
                </p>
              </Card>
            </motion.div>

            {/* Changes Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Card className="p-6 md:p-8" data-testid="card-changes">
                <h2 className="text-xl font-serif font-bold text-foreground mb-3">
                  Changes to the Privacy Policy
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Café Gourmand reserves the right to update or change this Privacy Policy at any time. Any changes will be posted on this page.
                </p>
              </Card>
            </motion.div>
          </div>

          {/* Contact */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-muted-foreground mb-4">
              If you have any questions about our Privacy Policy, please contact us.
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
