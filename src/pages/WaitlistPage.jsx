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

      <section className="product-card home-sections-card">
        <div className="product-sections">
          <section className="product-block block-efficiency">
            <h2>
              <span className="block-kicker">Outcomes</span>
              What you gain with Zorvee
            </h2>
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
            <h2>
              <span className="block-kicker">Capabilities</span>
              Everything in one production layer
            </h2>
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
            <h2>
              <span className="block-kicker">Use Cases</span>
              Built for teams that scale content
            </h2>
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
            <h2>
              <span className="block-kicker">FAQ</span>
              Frequently asked questions
            </h2>
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
