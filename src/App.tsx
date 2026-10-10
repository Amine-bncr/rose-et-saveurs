import { Suspense, lazy } from 'react';
import { About } from './components/About';
import { CustomOrder } from './components/CustomOrder';
import { Delivery } from './components/Delivery';
import { Faq } from './components/Faq';
import { Footer } from './components/Footer';
import { Gallery } from './components/Gallery';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HowToOrder } from './components/HowToOrder';
import { Menu } from './components/Menu';
import { Reviews } from './components/Reviews';
import { Signature } from './components/Signature';
import { StickyBar } from './components/StickyBar';
import { ClipDefs } from './components/motifs/ClipDefs';
import { BasketProvider, useBasket } from './lib/basketContext';

const BasketDrawer = lazy(() => import('./components/BasketDrawer'));

function Drawer() {
  const { drawerRequested } = useBasket();
  if (!drawerRequested) return null;
  return (
    <Suspense fallback={null}>
      <BasketDrawer />
    </Suspense>
  );
}

export default function App() {
  return (
    <BasketProvider>
      <ClipDefs />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[80] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:text-velvet">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Signature />
        <Menu />
        <CustomOrder />
        <HowToOrder />
        <Delivery />
        <Gallery />
        <About />
        <Reviews />
        <Faq />
      </main>
      <Footer />
      <StickyBar />
      <Drawer />
    </BasketProvider>
  );
}
