import { CAPABILITIES, FAQS, OUTCOMES, USE_CASES } from "../constants/productSections";

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
  const heroVideo = visibleVideos[0] ?? "";

  return (
    <main className="landing-panel">
      <section className="hero-stage">
        <div className="hero-center">
          <p className="waitlist-tag animated-program">Done-For-You Video Service</p>
          <h1 className="hero-title">
            <span className="title-accent">Zorvee</span>
            <br />
            <span className="title-accent">UGC-Style Videos</span>
            <br />
            <span className="title-accent">Made for</span> Your Brand
          </h1>
          <p className="subtext">
            We create custom videos using our in-house AI and deliver ready-to-post
            Facebook/Instagram Reels and YouTube Shorts. No tech setup needed from your side.
          </p>
          <div className="hero-cta-row">
            <button type="button" className="cta-primary" onClick={onNavigateProduct}>
              See Our Process
            </button>
          </div>
          <p className="waitlist-note">
            Share your brand once and we handle scripting, creation, and delivery.
          </p>
          <div className="form-box">
            {success ? (
              <h3 className="success">Thanks. We will reach out to plan your free sample video.</h3>
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
                  {loading ? "Submitting..." : "Request My Free Video"}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="hero-orbit" aria-hidden="true">
          <article className="float-card metric-card metric-left">
            <p className="float-value">{OUTCOMES[0].value}</p>
            <p className="float-label">{OUTCOMES[0].label}</p>
          </article>

          <article className="float-card media-card media-right">
            {visibleVideos[1] ? (
              <video src={visibleVideos[1]} autoPlay loop muted playsInline />
            ) : null}
          </article>

          <article className="float-card metric-card metric-right">
            <p className="float-value">{OUTCOMES[1].value}</p>
            <p className="float-label">{OUTCOMES[1].label}</p>
          </article>

          <article className="float-card media-card media-left">
            {visibleVideos[2] ? (
              <video src={visibleVideos[2]} autoPlay loop muted playsInline />
            ) : null}
          </article>

          <button
            type="button"
            className="phone-stage"
            onClick={() => heroVideo && onOpenVideo(heroVideo)}
            disabled={!heroVideo}
          >
            {heroVideo ? <video src={heroVideo} autoPlay loop muted playsInline /> : null}
            <span className="video-overlay-label" aria-hidden="true">
              ▶
            </span>
          </button>
        </div>
      </section>

      <section className="product-card home-sections-card">
        <div className="product-sections">
          <section className="product-block block-efficiency">
            <h2>What your team gets with Zorvee</h2>
            <div className="efficiency-grid">
              {OUTCOMES.map((metric) => (
                <article key={metric.label} className="efficiency-card">
                  <p className="efficiency-value">{metric.value}</p>
                  <p className="efficiency-label">{metric.label}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="product-block block-capabilities">
            <h2>What we handle for you</h2>
            <div className="capabilities-grid">
              {CAPABILITIES.map((item) => (
                <article key={item.title} className="capability-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="product-block block-use-cases">
            <h2>Built for brands that need content without the hassle</h2>
            <div className="use-case-grid">
              {USE_CASES.map((item) => (
                <article key={item.title} className="use-case-card">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="product-block block-faq">
            <h2>Frequently asked questions</h2>
            <div className="faq-list">
              {FAQS.map((item) => (
                <details key={item.question} className="faq-item">
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </section>

    </main>
  );
}

export default WaitlistPage;
