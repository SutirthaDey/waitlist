import { useEffect, useRef, useState } from "react";
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
import { supabase } from "./supabase";
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

  const carouselRef = useRef(null);

  useEffect(() => {
    if (activePage !== PAGES.WAITLIST || expandedVideoSrc) return;

    const container = carouselRef.current;
    if (!container) return;

    const videos = container.querySelectorAll(".carousel-video");
    if (!videos.length) return;

    setActiveVideoIndex(0);
    setPreviousVideoIndex(-1);
    videos[0].scrollIntoView({ behavior: "auto", block: "start" });

    const interval = setInterval(() => {
      setActiveVideoIndex((current) => {
        const next = (current + 1) % videos.length;
        setPreviousVideoIndex(current);
        videos[next].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
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

    const { error } = await supabase.from("waitlist").insert([formData]);

    if (error) {
      setToast({
        message: "Email already on the waitlist. We'll get back to you soon 🚀",
        type: "error",
      });
    } else {
      setToast({
        message: "You're added on the waitlist 🎉 We'll get back to you soon.",
        type: "success",
      });
      setSuccess(true);
    }

    setLoading(false);
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
      <Header activePage={activePage} onNavigate={handleNavigate} />

      {activePage === PAGES.WAITLIST ? (
        <WaitlistPage
          carouselRef={carouselRef}
          videoSources={VIDEO_SOURCES}
          activeVideoIndex={activeVideoIndex}
          previousVideoIndex={previousVideoIndex}
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

      <Toast message={toast.message} type={toast.type} />
      <VideoModal src={expandedVideoSrc} onClose={() => setExpandedVideoSrc("")} />
    </div>
  );
}

export default App;
