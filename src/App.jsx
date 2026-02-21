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
  const [expandedVideoSrc, setExpandedVideoSrc] = useState("");

  const carouselRef = useRef(null);
  const videoSources = ["/video1.mp4", "/video2.mp4", "/video3.mp4"];

  // Auto scroll runs only on waitlist and keeps active/previous states in sync.
  useEffect(() => {
    if (activePage !== "waitlist" || expandedVideoSrc) return;

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
    if (toast.message) {
      const timer = setTimeout(() => {
        setToast({ message: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
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

  const handleOpenDemo = () => {
    handleNavigate("waitlist");
    setExpandedVideoSrc(videoSources[0]);
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
                  <div key={src} className="video-frame">
                    <video
                      className={videoClassName}
                      src={src}
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                    <button
                      type="button"
                      className="video-overlay-trigger"
                      onClick={() => setExpandedVideoSrc(src)}
                    >
                      <span className="video-overlay-label">See Full Video</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="right">
            <div className="form-box">
              <p className="waitlist-tag">Early Access</p>
              <h1>AI Product Marketing Videos</h1>
              <p className="subtext">
                Fast, personalized, and ready to post.
              </p>
              <button
                type="button"
                className="product-focus-btn"
                onClick={() => handleNavigate("product")}
              >
                Explore Our Product
              </button>
              <p className="waitlist-note">
                See product features first, then reserve your spot.
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
            <h1>Create personalized product marketing videos with AI.</h1>
            <p>
              Built for quick ad-style short videos for your product in a few clicks.
            </p>
            <ol className="product-feature-list">
              <li>
                <div className="feature-head">
                  <span className="feature-number">1</span>
                  <span className="feature-tag">
                    <span className="feature-icon" aria-hidden="true">
                      👤
                    </span>
                    Persona
                  </span>
                </div>
                <span className="feature-desc">
                  Pick a ready persona or upload your images. We generate an
                  equivalent <span className="ai-accent">AI</span> persona.
                </span>
              </li>
              <li>
                <div className="feature-head">
                  <span className="feature-number">2</span>
                  <span className="feature-tag">
                    <span className="feature-icon" aria-hidden="true">
                      🎙️
                    </span>
                    Voice
                  </span>
                </div>
                <span className="feature-desc">
                  Use a preset voice or your own sample. We generate an
                  equivalent <span className="ai-accent">AI</span> voice.
                </span>
              </li>
              <li>
                <div className="feature-head">
                  <span className="feature-number">3</span>
                  <span className="feature-tag">
                    <span className="feature-icon" aria-hidden="true">
                      🌐
                    </span>
                    Language
                  </span>
                </div>
                <span className="feature-desc">
                  Choose any language to localize your marketing video.
                </span>
              </li>
              <li>
                <div className="feature-head">
                  <span className="feature-number">4</span>
                  <span className="feature-tag">
                    <span className="feature-icon" aria-hidden="true">
                      📝
                    </span>
                    Script + Output
                  </span>
                </div>
                <span className="feature-desc">
                  Give a topic for our <span className="ai-accent">AI</span>{" "}
                  script, or add your own script.
                  Congratulations, your video is ready.
                </span>
              </li>
            </ol>
            <div className="product-actions">
              <button type="button" className="demo-link-btn" onClick={handleOpenDemo}>
                See Demo Video
              </button>
            </div>
          </section>
        </main>
      )}
      {toast.message && (
        <div className={`toast ${toast.type}`}>{toast.message}</div>
      )}
      {expandedVideoSrc && (
        <div
          className="video-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Full video player"
          onClick={() => setExpandedVideoSrc("")}
        >
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="video-modal-close"
              onClick={() => setExpandedVideoSrc("")}
              aria-label="Close video player"
            >
              Close
            </button>
            <video
              className="video-modal-player"
              src={expandedVideoSrc}
              controls
              autoPlay
              playsInline
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
