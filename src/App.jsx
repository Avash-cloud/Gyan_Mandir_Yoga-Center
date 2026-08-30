import { BrowserRouter, Routes, Route } from "react-router-dom";
import './i18n/index.js'; // initialize i18n
import './theme/crimson.css'; // crimson theme variables
import { useDarkMode } from "./hooks/useDarkMode";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Classes from "./pages/Classes";
import Schedule from "./pages/Schedule";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";

export default function App() {
  const [theme, toggleTheme] = useDarkMode();

  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Panel routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Public Website routes */}
        <Route 
          path="/" 
          element={<MainLayout theme={theme} toggleTheme={toggleTheme} />}
        >
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="classes" element={<Classes />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<TermsOfService />} />
          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
