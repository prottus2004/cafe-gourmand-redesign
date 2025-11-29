import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { contactInfo } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

const contactMethods = [
  {
    icon: Phone,
    title: 'Phone Number',
    value: contactInfo.phone,
    href: `tel:${contactInfo.phone.replace(/\s/g, '')}`,
  },
  {
    icon: Mail,
    title: 'Email',
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
  },
  {
    icon: MapPin,
    title: 'Address',
    value: contactInfo.address,
    href: 'https://www.google.com/maps/search/?api=1&query=DIFC+Liberty+House+Dubai',
  },
];

export default function Contact() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: 'Message sent!',
          description: "We'll get back to you as soon as possible.",
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 md:py-32 bg-background overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-coffee-pattern opacity-5" />
      <motion.div
        className="absolute top-1/4 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity }}
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
            Get in Touch
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Contact <span className="text-primary">Us</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We'd love to hear from you about our coffee blends! Ask your questions or share your feedback.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact methods */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-6">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                
                return (
                  <motion.a
                    key={index}
                    href={method.href}
                    target={method.icon === MapPin ? '_blank' : undefined}
                    rel={method.icon === MapPin ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="block"
                    data-testid={`link-contact-${method.title.toLowerCase().replace(/\s/g, '-')}`}
                  >
                    <Card className="group p-6 bg-card border-card-border hover-elevate transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <motion.div
                          className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <Icon className="w-7 h-7 text-primary" />
                        </motion.div>
                        
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                            {method.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {method.value}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.a>
                );
              })}
            </div>

            {/* WhatsApp CTA */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button
                size="lg"
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white shadow-lg"
                asChild
              >
                <a
                  href={`https://wa.me/${contactInfo.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-whatsapp"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Us
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Card className="p-6 lg:p-8 bg-card border-card-border shadow-lg">
              <h3 className="text-xl font-serif font-bold text-foreground mb-2">
                Send A Message
              </h3>
              <p className="text-muted-foreground mb-6">
                We're here to assist you with any questions or inquiries.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="bg-background"
                      data-testid="input-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="bg-background"
                      data-testid="input-email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+971 50 000 0000"
                    className="bg-background"
                    data-testid="input-phone"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your inquiry..."
                    rows={5}
                    required
                    className="bg-background resize-none"
                    data-testid="input-message"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                  disabled={isSubmitting}
                  data-testid="button-submit-contact"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
