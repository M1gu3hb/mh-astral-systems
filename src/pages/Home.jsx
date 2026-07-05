import Hero from '../components/home/Hero';
import ClientMarquee from '../components/home/ClientMarquee';
import Servicios from '../components/home/Servicios';
import Casos from '../components/home/Casos';
import Diferenciador from '../components/home/Diferenciador';
import Tiers from '../components/home/Tiers';
import Proceso from '../components/home/Proceso';
import ContactCard from '../components/home/ContactCard';
import CTAFinal from '../components/home/CTAFinal';

// Home — the sales page. Section order follows docs/01: proof strip right
// after the hero, then the flyer-style service list, the systems bento and
// the case-study proof.
export default function Home() {
  return (
    <>
      <Hero />
      <ClientMarquee />
      <Servicios />
      <Casos />
      <Diferenciador />
      <Tiers />
      <Proceso />
      <ContactCard />
      <CTAFinal />
    </>
  );
}
