function WaitlistPage({
  carouselRef,
  videoSources,
  activeVideoIndex,
  previousVideoIndex,
  onOpenVideo,
  success,
  loading,
  onNavigateProduct,
  onSubmit,
  onInputChange,
}) {
  return (
    <div className="container">
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
                  onClick={() => onOpenVideo(src)}
                >
                  <span className="video-overlay-label">▶ Play</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="right">
        <div className="form-box">
          <p className="waitlist-tag">Early Access</p>
          <h1>AI Product Marketing Videos</h1>
          <p className="subtext">Fast, personalized, and ready to post.</p>
          <button
            type="button"
            className="product-focus-btn"
            onClick={onNavigateProduct}
          >
            Explore Our Product
          </button>
          <p className="waitlist-note">
            See product features first, then reserve your spot.
          </p>

          {success ? (
            <h3 className="success">🎉 You're on the waitlist!</h3>
          ) : (
            <form onSubmit={onSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                onChange={onInputChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                onChange={onInputChange}
              />

              <button disabled={loading}>
                {loading ? "Submitting..." : "Reserve My Spot"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default WaitlistPage;
