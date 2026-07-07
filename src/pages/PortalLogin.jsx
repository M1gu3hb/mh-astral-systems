import AuthScreen from '../components/app/AuthScreen';

// /portal — client login stub. In phase 1 there's no backend; the portal exists
// so the interaction (login → projects as folders) can be seen (docs/10). Real
// per-client auth is phase 2 (docs/05, docs/06).
export default function PortalLogin() {
  return (
    <AuthScreen
      scope="portal"
      accent="Portal de cliente"
      title="Portal de cliente"
      subtitle="Consulta tus proyectos, avances y archivos."
      redirectTo="/portal/dashboard"
      demoUser="demo"
    />
  );
}
