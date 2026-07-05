import Hero from '../components/home/Hero';
import ClientMarquee from '../components/home/ClientMarquee';
import ServiciosShowcase from '../components/home/ServiciosShowcase';
import Diferenciador from '../components/home/Diferenciador';
import Casos from '../components/home/Casos';
import Tiers from '../components/home/Tiers';
import ProcesoShowcase from '../components/home/ProcesoShowcase';
import ContactCard from '../components/home/ContactCard';
import CTAFinal from '../components/home/CTAFinal';

// Home — the sales page. Order per client direction: hero → proof strip →
// services (scroll showcase) → the auto-edit panel differentiator → real cases
// (expandable) → pricing → process (scroll showcase) → contact → final CTA.
export default function Home() {
  return (
    <>
      <Hero />
      <ClientMarquee />
      <ServiciosShowcase />
      <Diferenciador />
      <Casos />
      <Tiers />
      <ProcesoShowcase />
      <ContactCard />
      <CTAFinal />
    </>
  );
}
