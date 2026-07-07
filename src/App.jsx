import { Routes, Route } from 'react-router-dom';
import CursorGlow from './components/ui/CursorGlow';
import SplashScreen from './components/app/SplashScreen';
import SiteLayout from './components/layout/SiteLayout';
import Home from './pages/Home';
import About from './pages/About';
import Works from './pages/Works';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import PortalLogin from './pages/PortalLogin';
import PortalDashboard from './pages/PortalDashboard';
import NotFound from './pages/NotFound';

// Route map (client-defined IA): Home / About / Works / Blog, plus the
// unlinked internal admin and the client portal. Public marketing routes share
// SiteLayout (glass navbar + ASCII sign-off + footer); dashboards have their
// own chrome. The whole app boots behind the branded splash.
export default function App() {
  return (
    <SplashScreen>
      <CursorGlow />
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
          path="/about"
          element={
            <SiteLayout>
              <About />
            </SiteLayout>
          }
        />
        <Route
          path="/works"
          element={
            <SiteLayout>
              <Works />
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

        {/* Admin (internal, URL-only + password) */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Client portal */}
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
    </SplashScreen>
  );
}
