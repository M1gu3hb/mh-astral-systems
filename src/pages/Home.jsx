import Hero from '../components/home/Hero';
import VelocityBand from '../components/home/VelocityBand';
import ServiciosStack from '../components/home/ServiciosStack';
import Diferenciador from '../components/home/Diferenciador';
import ProcesoShowcase from '../components/home/ProcesoShowcase';

// Home (client-defined structure): hero → velocity band → services stack →
// the auto-edit panel differentiator → the 4-step process. Plans/CTA/card
// live in /about; cases/portal live in /works.
export default function Home() {
  return (
    <>
      <Hero />
      <VelocityBand />
      <ServiciosStack />
      <Diferenciador />
      <ProcesoShowcase />
    </>
  );
}
