import AuthScreen from '../components/app/AuthScreen';

// /admin — login stub for Miguel's internal panel (docs/01). No real auth yet.
export default function AdminLogin() {
  return (
    <AuthScreen
      scope="admin"
      accent="Panel interno"
      title="Panel de administración"
      subtitle="Acceso interno de MH Astral Systems."
      redirectTo="/admin/dashboard"
      demoUser="miguel"
    />
  );
}
