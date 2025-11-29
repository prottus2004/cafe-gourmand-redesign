import { motion } from 'framer-motion';
import { Wrench, CheckCircle, Clock, Shield, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useScrollAnimation, useSmoothScroll } from '@/hooks/useScrollAnimation';
import { maintenanceService, contactInfo } from '@/lib/data';

const serviceFeatures = [
  {
    icon: Wrench,
    title: 'Professional Servicing',
    description: 'Expert technicians with years of experience in coffee machine maintenance.',
  },
  {
    icon: Clock,
    title: 'Quick Response',
    description: 'Fast emergency repairs to minimize your downtime.',
  },
  {
    icon: Shield,
    title: 'Quality Guarantee',
    description: 'All repairs backed by our quality assurance guarantee.',
  },
  {
    icon: CheckCircle,
    title: 'Regular Maintenance',
    description: 'Scheduled maintenance plans to keep your equipment running smoothly.',
  },
];

export default function MaintenanceService() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const { scrollTo } = useSmoothScroll();

  return (
    <section
      id="maintenance"
      ref={ref}
      className="relative py-24 md:py-32 bg-secondary overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-coffee-pattern opacity-5" />
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              <Wrench className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-secondary-foreground">
                Professional Support
              </span>
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-secondary-foreground mb-6">
              {maintenanceService.title}
            </h2>

            <p className="text-lg text-secondary-foreground/80 mb-8 leading-relaxed">
              {maintenanceService.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => scrollTo('contact')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                data-testid="button-maintenance-contact"
              >
                Schedule Service
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10"
                asChild
              >
                <a href={`tel:${contactInfo.phone}`} data-testid="link-maintenance-call">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Service features grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {serviceFeatures.map((feature, index) => {
                const Icon = feature.icon;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <Card className="group p-5 bg-secondary-foreground/5 border-secondary-foreground/10 backdrop-blur-sm hover-elevate">
                      <motion.div
                        className="w-12 h-12 rounded-md bg-primary/20 flex items-center justify-center mb-4"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Icon className="w-6 h-6 text-primary" />
                      </motion.div>
                      
                      <h3 className="text-lg font-semibold text-secondary-foreground mb-2 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-secondary-foreground/70">
                        {feature.description}
                      </p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-primary/10 rounded-full pointer-events-none"
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotate: { duration: 30, repeat: Infinity, ease: 'linear' },
            scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
      </div>
    </section>
  );
}
