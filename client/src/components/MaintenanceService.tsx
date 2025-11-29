import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wrench, CheckCircle, Clock, Shield, Phone, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useScrollAnimation, useSmoothScroll } from '@/hooks/useScrollAnimation';
import { maintenanceService, contactInfo } from '@/lib/data';

const serviceFeatures = [
  {
    icon: Wrench,
    title: 'Professional Servicing',
    description: 'Expert technicians with years of experience in coffee machine maintenance.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Clock,
    title: 'Quick Response',
    description: 'Fast emergency repairs to minimize your downtime.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Shield,
    title: 'Quality Guarantee',
    description: 'All repairs backed by our quality assurance guarantee.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: CheckCircle,
    title: 'Regular Maintenance',
    description: 'Scheduled maintenance plans to keep your equipment running smoothly.',
    color: 'from-blue-500 to-indigo-500',
  },
];

export default function MaintenanceService() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const { scrollTo } = useSmoothScroll();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section
      id="maintenance"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background dark:from-background dark:via-muted/10 dark:to-background"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-coffee-pattern opacity-[0.03] dark:opacity-[0.02]" />
      
      {/* Gradient orbs */}
      <motion.div
        className="absolute top-20 right-10 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(30, 65%, 45%, 0.15), transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-[350px] h-[350px] rounded-full blur-[80px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(35, 60%, 50%, 0.12), transparent 70%)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.12, 0.2, 0.12],
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
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                Professional Support
              </span>
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
              {maintenanceService.title}
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {maintenanceService.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  onClick={() => scrollTo('contact')}
                  className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg shadow-primary/20 group"
                  data-testid="button-maintenance-contact"
                >
                  Schedule Service
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border hover:bg-muted/50"
                  asChild
                >
                  <a href={`tel:${contactInfo.phone}`} data-testid="link-maintenance-call">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </a>
                </Button>
              </motion.div>
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
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <Card className="group relative p-5 bg-card/80 dark:bg-card/50 border-border/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden">
                      {/* Gradient overlay on hover */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                      />
                      
                      <motion.div
                        className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>
                      
                      <h3 className="relative text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="relative text-sm text-muted-foreground">
                        {feature.description}
                      </p>

                      {/* Animated border gradient */}
                      <motion.div
                        className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${feature.color}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: hoveredCard === index ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ transformOrigin: 'left' }}
                      />
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Decorative rotating ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/5 rounded-full pointer-events-none hidden lg:block"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-primary/8 rounded-full pointer-events-none hidden lg:block"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
    </section>
  );
}
