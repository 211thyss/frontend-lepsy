import { useState, useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Hero } from "./components/Hero";
import { Steps } from "./components/Steps";
import { Providers } from "./components/Providers";
import { Navbar } from "./components/Navbar";
import { Formats } from "./components/Formats";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { CookieBanner } from "./components/CookieBanner";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { LegalNotice } from "./pages/LegalNotice";
import { Login } from "./pages/admin/Login";
import { Dashboard } from "./pages/admin/Dashboard";
import { Appointments } from "./pages/admin/Appointments";
import { Patients } from "./pages/admin/Patients";
import { Messages } from "./pages/admin/Messages";
import { Availability } from "./pages/admin/Availability";
import { Profile } from "./pages/admin/Profile";
import { Articles } from "./pages/admin/Articles";
import { ArticleEditor } from "./pages/admin/ArticleEditor";
import { Users } from "./pages/admin/Users";
import { PatientDashboard } from "./pages/patient/Dashboard";
import { BookingWizard } from "./components/BookingWizard";
import { Blog } from "./pages/Blog";
import { ArticleDetail } from "./pages/ArticleDetail";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/politique-confidentialite") {
      setCurrentPage("privacy");
    } else if (path === "/mentions-legales") {
      setCurrentPage("legal");
    } else if (path === "/login" || path === "/admin/login") {
      setCurrentPage("login");
    } else if (path === "/patient/dashboard") {
      setCurrentPage("patient-dashboard");
    } else if (path === "/admin/dashboard" || path === "/admin") {
      setCurrentPage("dashboard");
    } else if (path === "/admin/appointments") {
      setCurrentPage("appointments");
    } else if (path === "/admin/patients") {
      setCurrentPage("patients");
    } else if (path === "/admin/articles") {
      setCurrentPage("articles");
    } else if (path.startsWith("/admin/articles/")) {
      setCurrentPage("article-editor");
    } else if (path === "/admin/messages") {
      setCurrentPage("messages");
    } else if (path === "/admin/availability") {
      setCurrentPage("availability");
    } else if (path === "/admin/profile") {
      setCurrentPage("profile");
    } else if (path === "/admin/users") {
      setCurrentPage("users");
    } else if (path === "/prendre-rdv" || path === "/booking") {
      setCurrentPage("booking");
    } else if (path === "/blog" || path === "/actualites") {
      setCurrentPage("blog");
    } else if (path.startsWith("/blog/")) {
      setCurrentPage("article");
    } else {
      setCurrentPage("home");
    }

    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === "/politique-confidentialite") {
        setCurrentPage("privacy");
      } else if (path === "/mentions-legales") {
        setCurrentPage("legal");
      } else if (path === "/login" || path === "/admin/login") {
        setCurrentPage("login");
      } else if (path === "/patient/dashboard") {
        setCurrentPage("patient-dashboard");
      } else if (path === "/admin/dashboard" || path === "/admin") {
        setCurrentPage("dashboard");
      } else if (path === "/admin/appointments") {
        setCurrentPage("appointments");
      } else if (path === "/admin/patients") {
        setCurrentPage("patients");
      } else if (path === "/admin/articles") {
        setCurrentPage("articles");
      } else if (path.startsWith("/admin/articles/")) {
        setCurrentPage("article-editor");
      } else if (path === "/admin/messages") {
        setCurrentPage("messages");
      } else if (path === "/admin/availability") {
        setCurrentPage("availability");
      } else if (path === "/admin/profile") {
        setCurrentPage("profile");
      } else if (path === "/admin/users") {
        setCurrentPage("users");
      } else if (path === "/prendre-rdv" || path === "/booking") {
        setCurrentPage("booking");
      } else if (path === "/blog" || path === "/actualites") {
        setCurrentPage("blog");
      } else if (path.startsWith("/blog/")) {
        setCurrentPage("article");
      } else {
        setCurrentPage("home");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  if (currentPage === "login") {
    return (
      <AuthProvider>
        <Login />
      </AuthProvider>
    );
  }

  if (currentPage === "booking") {
    return (
      <AuthProvider>
        <Navbar />
        <BookingWizard />
        <Footer />
      </AuthProvider>
    );
  }

  if (currentPage === "patient-dashboard") {
    return (
      <AuthProvider>
        <ProtectedRoute>
          <PatientDashboard />
        </ProtectedRoute>
      </AuthProvider>
    );
  }

  if (currentPage === "dashboard") {
    return (
      <AuthProvider>
        <ProtectedRoute requireAdmin={true}>
          <Dashboard />
        </ProtectedRoute>
      </AuthProvider>
    );
  }

  if (currentPage === "appointments") {
    return (
      <AuthProvider>
        <ProtectedRoute requireAdmin={true}>
          <Appointments />
        </ProtectedRoute>
      </AuthProvider>
    );
  }

  if (currentPage === "patients") {
    return (
      <AuthProvider>
        <ProtectedRoute requireAdmin={true}>
          <Patients />
        </ProtectedRoute>
      </AuthProvider>
    );
  }

  if (currentPage === "messages") {
    return (
      <AuthProvider>
        <ProtectedRoute requireAdmin={true}>
          <Messages />
        </ProtectedRoute>
      </AuthProvider>
    );
  }

  if (currentPage === "availability") {
    return (
      <AuthProvider>
        <ProtectedRoute requireAdmin={true}>
          <Availability />
        </ProtectedRoute>
      </AuthProvider>
    );
  }

  if (currentPage === "profile") {
    return (
      <AuthProvider>
        <ProtectedRoute requireAdmin={true}>
          <Profile />
        </ProtectedRoute>
      </AuthProvider>
    );
  }

  if (currentPage === "articles") {
    return (
      <AuthProvider>
        <ProtectedRoute requireAdmin={true}>
          <Articles />
        </ProtectedRoute>
      </AuthProvider>
    );
  }

  if (currentPage === "article-editor") {
    return (
      <AuthProvider>
        <ProtectedRoute requireAdmin={true}>
          <ArticleEditor />
        </ProtectedRoute>
      </AuthProvider>
    );
  }

  if (currentPage === "users") {
    return (
      <AuthProvider>
        <ProtectedRoute requireAdmin={true}>
          <Users />
        </ProtectedRoute>
      </AuthProvider>
    );
  }

  if (currentPage === "admin") {
    return (
      <AuthProvider>
        <Navbar />
        <div style={{ padding: "6rem 2rem", textAlign: "center" }}>
          <h1>Page Admin (En construction)</h1>
          <p>Cette page sera bientôt disponible</p>
        </div>
      </AuthProvider>
    );
  }

  if (currentPage === "privacy") {
    return (
      <AuthProvider>
        <Navbar />
        <PrivacyPolicy />
        <Footer />
      </AuthProvider>
    );
  }

  if (currentPage === "legal") {
    return (
      <AuthProvider>
        <Navbar />
        <LegalNotice />
        <Footer />
      </AuthProvider>
    );
  }

  if (currentPage === "blog") {
    return (
      <AuthProvider>
        <Navbar />
        <Blog />
        <Footer />
      </AuthProvider>
    );
  }

  if (currentPage === "article") {
    return (
      <AuthProvider>
        <Navbar />
        <ArticleDetail />
        <Footer />
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <a href="#main-content" className="skip-to-content">
        Aller au contenu principal
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Steps />
        <Providers />
        <Formats />
        <Contact />
      </main>
      <Footer />
      <CookieBanner />
    </AuthProvider>
  );
}
