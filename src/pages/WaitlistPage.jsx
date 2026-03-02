function WaitlistPage({
  videoSources,
  activeVideoIndex,
  onOpenVideo,
  success,
  loading,
  onNavigateProduct,
  onSubmit,
  onInputChange,
}) {
  const visibleVideos = Array.from({ length: 4 }, (_, index) => {
    if (!videoSources.length) return "";
    return videoSources[(activeVideoIndex + index) % videoSources.length];
  });

  return (
    <main className="landing-panel">
      <section className="hero-center">
        <p className="waitlist-tag animated-program">Early Access Program</p>
        <h1 className="hero-title">
          <span className="title-accent">Zorvee</span>
          <br />
          <span className="title-accent">AI Powered</span> Content
          <br />
          <span className="title-accent">Generation</span> Engine For Your
          <br />
          Brand
        </h1>
        <p className="subtext">
          Launch polished ad creatives in minutes with personas, voice, and
          multilingual output tailored to your brand.
        </p>
        <div className="hero-cta-row">
          <button type="button" className="cta-primary" onClick={onNavigateProduct}>
            How It Works
          </button>
        </div>
        <p className="waitlist-note">
          Review the product flow, then join the waitlist for priority access.
        </p>
        <div className="form-box">
          {success ? (
            <h3 className="success">You are on the waitlist.</h3>
          ) : (
            <form onSubmit={onSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full name"
                required
                onChange={onInputChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                onChange={onInputChange}
              />

              <button disabled={loading}>
                {loading ? "Submitting..." : "Get In Touch"}
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="video-row" aria-label="Featured videos">
        {visibleVideos.map((videoSrc, index) => (
          <button
            type="button"
            key={`${videoSrc}-${index}`}
            className="video-tile"
            onClick={() => onOpenVideo(videoSrc)}
            disabled={!videoSrc}
          >
            {videoSrc ? <video src={videoSrc} autoPlay loop muted playsInline /> : null}
            <span className="video-overlay-label" aria-hidden="true">
              ▶
            </span>
          </button>
        ))}
      </section>
    </main>
  );
}

export default WaitlistPage;
