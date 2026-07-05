import Hero from '../components/home/Hero';
import Servicios from '../components/home/Servicios';
import SistemasBento from '../components/home/SistemasBento';
import Casos from '../components/home/Casos';
import Diferenciador from '../components/home/Diferenciador';
import Tiers from '../components/home/Tiers';
import Proceso from '../components/home/Proceso';
import ContactCard from '../components/home/ContactCard';
import CTAFinal from '../components/home/CTAFinal';

// Home — the sales page. Section order follows docs/01, with the systems bento
// slotted between the flyer-style service list and the case-study proof.
export default function Home() {
  return (
    <>
      <Hero />
      <Servicios />
      <SistemasBento />
      <Casos />
      <Diferenciador />
      <Tiers />
      <Proceso />
      <ContactCard />
      <CTAFinal />
    </>
  );
}
