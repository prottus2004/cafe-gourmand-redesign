import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import CoffeeProducts from '@/components/CoffeeProducts';
import CommercialMachines from '@/components/CommercialMachines';
import HomeMachines from '@/components/HomeMachines';
import MaintenanceService from '@/components/MaintenanceService';
import Contact from '@/components/Contact';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <CartDrawer />
      
      {/* Theme Toggle - Fixed position */}
      <div className="fixed bottom-6 right-6 z-40">
        <ThemeToggle />
      </div>
      
      <main>
        <Hero />
        <About />
        <CoffeeProducts />
        <CommercialMachines />
        <HomeMachines />
        <MaintenanceService />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}
