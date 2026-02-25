function ProductPage({ onOpenDemo }) {
  return (
    <main className="product-page">
      <section className="product-card">
        <p className="product-tag">Our Product</p>
        <h1>Create personalized product marketing videos with AI.</h1>
        <p>
          Built for quick ad-style short videos for your product in a few
          clicks.
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
              Use a preset voice or your own sample. We generate an equivalent
              <span className="ai-accent"> AI</span> voice.
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
              Give a topic for our <span className="ai-accent">AI</span> script,
              or add your own script. Congratulations, your video is ready.
            </span>
          </li>
        </ol>
        <div className="product-actions">
          <button type="button" className="demo-link-btn" onClick={onOpenDemo}>
            See Demo Video
          </button>
        </div>
      </section>
    </main>
  );
}

export default ProductPage;
