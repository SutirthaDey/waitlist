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
  const primaryVideo = videoSources[activeVideoIndex] ?? videoSources[0];
  const sideVideoTop =
    videoSources[(activeVideoIndex + 1) % videoSources.length] ?? videoSources[0];
  const sideVideoBottom =
    videoSources[(activeVideoIndex + 2) % videoSources.length] ?? videoSources[0];

  return (
    <main className="landing-panel">
      <section className="hero-left">
        <p className="waitlist-tag">Early Access Program</p>
        <h1 className="hero-title">
          <span>Create high-converting</span>
          <br />
          product videos
          <br />
          with AI
        </h1>
        <p className="subtext">
          Launch polished ad creatives in minutes with personas, voice, and
          multilingual output tailored to your brand.
        </p>
        <div className="hero-cta-row">
          <button type="button" className="cta-primary" onClick={onNavigateProduct}>
            Explore Product Features
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
                placeholder="Work email"
                required
                onChange={onInputChange}
              />

              <button disabled={loading}>
                {loading ? "Submitting..." : "Join the Waitlist"}
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="hero-right">
        <button type="button" className="media-main" onClick={() => onOpenVideo(primaryVideo)}>
          <video className="carousel-video is-active" src={primaryVideo} autoPlay loop muted playsInline />
          <span className="video-overlay-label">▶ Play</span>
        </button>
        <button type="button" className="media-mini media-mini-top" onClick={() => onOpenVideo(sideVideoTop)}>
          <video src={sideVideoTop} autoPlay loop muted playsInline />
        </button>
        <button
          type="button"
          className="media-mini media-mini-bottom"
          onClick={() => onOpenVideo(sideVideoBottom)}
        >
          <video src={sideVideoBottom} autoPlay loop muted playsInline />
        </button>
      </section>
    </main>
  );
}

export default WaitlistPage;
