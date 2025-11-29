import { motion } from 'framer-motion';
import { Coffee, Heart, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { aboutSections } from '@/lib/data';

const iconMap = {
  coffee: Coffee,
  heart: Heart,
  sparkles: Sparkles,
};

export default function About() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 md:py-32 bg-background overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-coffee-pattern opacity-5" />
      <motion.div
        className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
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
            About Us
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Discover Our <span className="text-primary">Story</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Café Gourmand Blends result from the research of the best quality of raw materials and the most accurate roasting. Proudly, our coffee blends are carefully selected and roasted in Venice, Italy.
          </p>
        </motion.div>

        {/* About cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {aboutSections.map((section, index) => {
            const Icon = iconMap[section.icon as keyof typeof iconMap];
            
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              >
                <Card className="group relative h-full p-6 lg:p-8 bg-card border-card-border overflow-visible hover-elevate">
                  {/* Icon container */}
                  <motion.div
                    className="relative w-16 h-16 mb-6 rounded-md bg-primary/10 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Icon className="w-8 h-8 text-primary" />
                    
                    {/* Glow effect on hover */}
                    <motion.div
                      className="absolute inset-0 bg-primary/20 rounded-md blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl lg:text-2xl font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.description}
                  </p>

                  {/* Decorative corner accent */}
                  <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-tl from-primary/10 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Decorative coffee beans row */}
        <motion.div
          className="flex justify-center gap-4 mt-16"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-5 bg-primary/30 rounded-full"
              style={{ transform: `rotate(${45 + i * 10}deg)` }}
              animate={{
                y: [0, -5, 0],
                rotate: [45 + i * 10, 50 + i * 10, 45 + i * 10],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
