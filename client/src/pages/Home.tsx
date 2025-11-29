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

export default function Home() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-500">
      <Navigation />
      <CartDrawer />
      
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
