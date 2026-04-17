import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Toast from "./components/Toast";
import VideoModal from "./components/VideoModal";
import { EXAMPLE_VIDEO_CATEGORIES } from "./constants/examples";
import {
  EXAMPLES_ROUTE,
  PAGES,
  PRODUCT_ROUTE,
  WAITLIST_ROUTE,
} from "./constants/routes";
import { VIDEO_SOURCES } from "./constants/videos";
import ExamplesPage from "./pages/ExamplesPage";
import ProductPage from "./pages/ProductPage";
import WaitlistPage from "./pages/WaitlistPage";
import { hasSupabaseConfig, supabase } from "./supabase";
import { getRouteFromPath } from "./utils/routing";

function App() {
  const [activePage, setActivePage] = useState(() =>
    getRouteFromPath(window.location.pathname),
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState({
    message: "",
    type: "", // "success" | "error"
  });
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [previousVideoIndex, setPreviousVideoIndex] = useState(-1);
  const [expandedVideoSrc, setExpandedVideoSrc] = useState("");

  useEffect(() => {
    if (activePage !== PAGES.WAITLIST || expandedVideoSrc) return;
    if (!VIDEO_SOURCES.length) return;
    setActiveVideoIndex(0);
    setPreviousVideoIndex(-1);

    const interval = setInterval(() => {
      setActiveVideoIndex((current) => {
        const next = (current + 1) % VIDEO_SOURCES.length;
        setPreviousVideoIndex(current);
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [activePage, expandedVideoSrc]);

  useEffect(() => {
    if (window.location.pathname === "/") {
      window.history.replaceState({}, "", WAITLIST_ROUTE);
    }

    const syncRoute = () => {
      setActivePage(getRouteFromPath(window.location.pathname));
    };

    window.addEventListener("popstate", syncRoute);
    syncRoute();

    return () => window.removeEventListener("popstate", syncRoute);
  }, []);

  useEffect(() => {
    if (!toast.message) return;

    const timer = setTimeout(() => {
      setToast({ message: "", type: "" });
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!expandedVideoSrc) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setExpandedVideoSrc("");
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, [expandedVideoSrc]);

  const handleInputChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleNavigate = (page) => {
    const routeMap = {
      [PAGES.WAITLIST]: WAITLIST_ROUTE,
      [PAGES.PRODUCT]: PRODUCT_ROUTE,
      [PAGES.EXAMPLES]: EXAMPLES_ROUTE,
    };

    const nextPath = routeMap[page] ?? WAITLIST_ROUTE;
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, "", nextPath);
    }
    setActivePage(page);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccess(false);

    if (!hasSupabaseConfig || !supabase) {
      setToast({
        message:
          "Form is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment.",
        type: "error",
      });
      setLoading(false);
      return;
    }

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
    };

    try {
      const { error } = await supabase.from("waitlist").insert([payload]);

      if (error) {
        const errorText = `${error.message ?? ""} ${error.details ?? ""}`.toLowerCase();
        const isDuplicateEmail =
          error.code === "23505" ||
          /duplicate|already exists|unique/i.test(error.message ?? "");
        const isPermissionError =
          error.code === "42501" || /row-level security|permission denied/.test(errorText);
        const isMissingTable =
          error.code === "42P01" || /relation .* does not exist|table .* does not exist/.test(errorText);
        const isConnectionError = /fetch failed|failed to fetch|getaddrinfo|network/i.test(
          errorText,
        );

        setToast({
          message: isDuplicateEmail
            ? "This email is already registered. We will reach out to discuss your free sample video."
            : isPermissionError
              ? "Supabase policy is blocking inserts. Enable an INSERT policy for anon users on the waitlist table."
              : isMissingTable
                ? "Supabase table 'waitlist' was not found. Create it in the public schema."
                : isConnectionError
                  ? "Could not reach Supabase. Check VITE_SUPABASE_URL and internet/DNS access."
            : "Could not submit your request right now. Please try again in a moment.",
          type: "error",
        });
      } else {
        setToast({
          message: "Request received. We will contact you to plan your free sample video.",
          type: "success",
        });
        setSuccess(true);
      }
    } catch {
      setToast({
        message:
          "Unexpected error while submitting. Check browser console and Supabase configuration.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenVideo = (src) => {
    setExpandedVideoSrc(src);
  };

  const handleOpenDemo = () => {
    handleNavigate(PAGES.WAITLIST);
    setExpandedVideoSrc(VIDEO_SOURCES[0]);
  };

  return (
    <div className="app-shell">
      <div className="site-frame">
        <Header activePage={activePage} onNavigate={handleNavigate} />

        {activePage === PAGES.WAITLIST ? (
          <WaitlistPage
            videoSources={VIDEO_SOURCES}
            activeVideoIndex={activeVideoIndex}
            onOpenVideo={handleOpenVideo}
            success={success}
            loading={loading}
            onNavigateProduct={() => handleNavigate(PAGES.PRODUCT)}
            onSubmit={handleSubmit}
            onInputChange={handleInputChange}
          />
        ) : activePage === PAGES.EXAMPLES ? (
          <ExamplesPage
            categories={EXAMPLE_VIDEO_CATEGORIES}
            onOpenVideo={handleOpenVideo}
          />
        ) : (
          <ProductPage onOpenDemo={handleOpenDemo} />
        )}
      </div>

      <Toast message={toast.message} type={toast.type} />
      <VideoModal src={expandedVideoSrc} onClose={() => setExpandedVideoSrc("")} />
    </div>
  );
}

export default App;
