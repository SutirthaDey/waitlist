import { useState, useEffect, useRef } from "react";
import { supabase } from "./supabase";
import "./App.css";

function App() {
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

  const carouselRef = useRef(null);

  // 🔥 Auto scroll every 5 seconds
  useEffect(() => {
    const container = carouselRef.current;
    let index = 0;

    const interval = setInterval(() => {
      if (!container) return;

      const videos = container.querySelectorAll("video");
      index = (index + 1) % videos.length;

      videos[index].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 5000);

    return () => clearInterval(interval);
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
        message: "You're on the waitlist 🎉",
        type: "alert",
      });
      setSuccess(true);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      {/* LEFT SIDE */}
      <div className="left">
        <div className="video-carousel" ref={carouselRef}>
          <video src="/video1.mp4" autoPlay loop muted playsInline />
          <video src="/video2.mp4" autoPlay loop muted playsInline />
          <video src="/video3.mp4" autoPlay loop muted playsInline />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="right">
        <div className="form-box">
          <h1>Join Our Early Access 🚀</h1>
          <p>Create stunning AI videos in seconds.</p>

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
      {toast.message && (
        <div className={`toast ${toast.type}`}>{toast.message}</div>
      )}
    </div>
  );
}

export default App;
