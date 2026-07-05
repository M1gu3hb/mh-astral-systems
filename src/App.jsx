import { Routes, Route } from 'react-router-dom';
import SiteLayout from './components/layout/SiteLayout';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import PortalLogin from './pages/PortalLogin';
import PortalDashboard from './pages/PortalDashboard';
import NotFound from './pages/NotFound';

// Route map (docs/01, extended with the portal per the phase brief). Public
// marketing routes share SiteLayout (navbar + footer); the admin and portal
// areas have their own minimal chrome.
export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <SiteLayout>
            <Home />
          </SiteLayout>
        }
      />
      <Route
        path="/blog"
        element={
          <SiteLayout>
            <Blog />
          </SiteLayout>
        }
      />
      <Route
        path="/blog/:slug"
        element={
          <SiteLayout>
            <BlogPost />
          </SiteLayout>
        }
      />

      {/* Admin (internal, docs/01) */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      {/* Client portal (phase brief) */}
      <Route path="/portal" element={<PortalLogin />} />
      <Route path="/portal/dashboard" element={<PortalDashboard />} />

      <Route
        path="*"
        element={
          <SiteLayout>
            <NotFound />
          </SiteLayout>
        }
      />
    </Routes>
  );
}
