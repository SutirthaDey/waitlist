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
          <p className="waitlist-tag">Early Access Program</p>
          <h1>Create high-converting product videos with AI</h1>
          <p className="subtext">
            Launch polished ad creatives in minutes with personas, voice, and
            multilingual output tailored to your brand.
          </p>
          <button
            type="button"
            className="product-focus-btn"
            onClick={onNavigateProduct}
          >
            Explore Product Features
          </button>
          <p className="waitlist-note">
            Review the product flow, then join the waitlist for priority access.
          </p>

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
      </div>
    </div>
  );
}

export default WaitlistPage;
