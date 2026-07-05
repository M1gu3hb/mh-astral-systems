import AuthScreen from '../components/app/AuthScreen';

// /admin — private internal panel for Miguel. Reachable only by typing the URL
// (no link anywhere on the site) and gated by a password. The stored value is a
// SHA-256 digest so the plaintext never ships in the bundle.
const ADMIN_PWD_HASH = 'a295620f53c63eda81a6052d3a96092f212b29331d8da46c66854f37bc9bf730';

export default function AdminLogin() {
  return (
    <AuthScreen
      scope="admin"
      accent="Acceso restringido"
      title="Panel de administración"
      subtitle="Acceso interno de MH Astral Systems."
      redirectTo="/admin/dashboard"
      passwordHash={ADMIN_PWD_HASH}
    />
  );
}
