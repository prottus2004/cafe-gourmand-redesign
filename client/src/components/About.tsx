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

const colorMap = {
  coffee: 'from-amber-500 to-orange-500',
  heart: 'from-rose-500 to-pink-500',
  sparkles: 'from-violet-500 to-purple-500',
};

export default function About() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background dark:from-background dark:via-muted/5 dark:to-background"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-coffee-pattern opacity-[0.03] dark:opacity-[0.02]" />
      
      {/* Gradient orbs */}
      <motion.div
        className="absolute top-20 right-10 w-[350px] h-[350px] rounded-full blur-[100px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(30, 65%, 45%, 0.12), transparent 70%)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.12, 0.2, 0.12],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-[300px] h-[300px] rounded-full blur-[80px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(35, 60%, 50%, 0.1), transparent 70%)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.18, 0.1],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Coffee className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              About Us
            </span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Discover Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">Story</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Café Gourmand Blends result from the research of the best quality of raw materials and the most accurate roasting. Proudly, our coffee blends are carefully selected and roasted in Venice, Italy.
          </p>
        </motion.div>

        {/* About cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {aboutSections.map((section, index) => {
            const Icon = iconMap[section.icon as keyof typeof iconMap];
            const gradientColor = colorMap[section.icon as keyof typeof colorMap] || colorMap.coffee;
            
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              >
                <Card className="group relative h-full p-6 lg:p-8 bg-card/80 dark:bg-card/50 border-border/50 backdrop-blur-sm overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                  {/* Gradient overlay on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />
                  
                  {/* Icon container */}
                  <motion.div
                    className={`relative w-16 h-16 mb-6 rounded-xl bg-gradient-to-br ${gradientColor} flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="relative text-xl lg:text-2xl font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {section.title}
                  </h3>
                  <p className="relative text-muted-foreground leading-relaxed">
                    {section.description}
                  </p>

                  {/* Decorative corner accent */}
                  <motion.div 
                    className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-tl from-primary/10 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
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
              className="w-3 h-5 bg-gradient-to-br from-primary/40 to-primary/20 rounded-full shadow-sm"
              style={{ transform: `rotate(${45 + i * 10}deg)` }}
              animate={{
                y: [0, -8, 0],
                rotate: [45 + i * 10, 55 + i * 10, 45 + i * 10],
              }}
              transition={{
                duration: 2.5,
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
