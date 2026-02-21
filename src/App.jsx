import { useState, useEffect, useRef } from "react";
import { supabase } from "./supabase";
import "./App.css";

const WAITLIST_ROUTE = "/join-waitlist";
const PRODUCT_ROUTE = "/our-product";

const getRouteFromPath = (pathname) => {
  if (pathname === PRODUCT_ROUTE) return "product";
  return "waitlist";
};

function App() {
  const [activePage, setActivePage] = useState(() =>
    getRouteFromPath(window.location.pathname)
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [toast, setToast] = useState({
    message: "",
    type: "", // "success" | "error"
  });
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [previousVideoIndex, setPreviousVideoIndex] = useState(-1);

  const carouselRef = useRef(null);
  const videoSources = ["/video1.mp4", "/video2.mp4", "/video3.mp4"];

  // Auto scroll runs only on waitlist and keeps active/previous states in sync.
  useEffect(() => {
    if (activePage !== "waitlist") return;

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
  }, [activePage]);

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
    if (toast.message) {
      const timer = setTimeout(() => {
        setToast({ message: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNavigate = (page) => {
    const nextPath = page === "product" ? PRODUCT_ROUTE : WAITLIST_ROUTE;
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, "", nextPath);
    }
    setActivePage(page);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.from("waitlist").insert([formData]);

    if (error) {
      setToast({
        message: "Email already on the waitlist. We'll get back to you soon 🚀",
        type: "alert",
      });
    } else {
      setToast({
        message: "You're added on the waitlist 🎉 We'll get back to you soon.",
        type: "alert",
      });
      setSuccess(true);
    }

    setLoading(false);
  };

  return (
    <div className="app-shell">
      <header className="top-header">
        <div className="brand">zorvee</div>
        <nav className="header-nav" aria-label="Main navigation">
          <button
            type="button"
            className={activePage === "product" ? "active" : ""}
            onClick={() => handleNavigate("product")}
          >
            Our Product
          </button>
          <button
            type="button"
            className={activePage === "waitlist" ? "active" : ""}
            onClick={() => handleNavigate("waitlist")}
          >
            Join Waitlist
          </button>
        </nav>
      </header>

      {activePage === "waitlist" ? (
        <div className="container">
          {/* LEFT SIDE */}
          <div className="left">
            <div className="video-carousel" ref={carouselRef}>
              {videoSources.map((src, index) => {
                const videoClassName =
                  index === activeVideoIndex
                    ? "carousel-video is-active"
                    : index === previousVideoIndex
                    ? "carousel-video is-previous"
                    : "carousel-video";
                return (
                  <video
                    key={src}
                    className={videoClassName}
                    src={src}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="right">
            <div className="form-box">
              <h1>Join Our Early Access 🚀</h1>
              <p className="subtext">
                Create stunning <span className="highlight">AI videos</span> in
                seconds
              </p>

              {success ? (
                <h3 className="success">🎉 You're on the waitlist!</h3>
              ) : (
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    onChange={handleChange}
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    onChange={handleChange}
                  />

                  <button disabled={loading}>
                    {loading ? "Submitting..." : "Reserve My Spot"}
                  </button>

                  {errorMsg && <p className="error">{errorMsg}</p>}
                </form>
              )}
            </div>
          </div>
        </div>
      ) : (
        <main className="product-page">
          <section className="product-card">
            <p className="product-tag">Our Product</p>
            <h1>Build premium AI videos with zero editing complexity.</h1>
            <p>
              zorvee helps you generate, style, and publish studio-like videos
              in minutes with a dark-modern workflow built for creators and
              teams.
            </p>
            <button type="button" onClick={() => handleNavigate("waitlist")}>
              Join Waitlist
            </button>
          </section>
        </main>
      )}
      {toast.message && (
        <div className={`toast ${toast.type}`}>{toast.message}</div>
      )}
    </div>
  );
}

export default App;
