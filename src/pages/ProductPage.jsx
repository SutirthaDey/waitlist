function ProductPage({ onOpenDemo }) {
  return (
    <main className="product-page">
      <section className="product-card">
        <p className="product-tag">Product Overview</p>
        <h1>From product brief to launch-ready video, in one workflow.</h1>
        <p>
          Zorvee helps teams produce consistent, on-brand short-form videos
          faster by automating persona, voice, scripting, and localization.
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
              Select a ready-to-use presenter or upload reference images to
              create a brand-aligned <span className="ai-accent">AI</span>{" "}
              persona.
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
              Choose from studio-quality voices or train one from your own
              sample for consistent brand delivery.
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
              Localize each video for global audiences with natural-sounding
              multilingual output.
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
              Generate a script from a product prompt or paste your own copy,
              then export a final video that is ready to publish.
            </span>
          </li>
        </ol>
        <div className="product-actions">
          <button type="button" className="demo-link-btn" onClick={onOpenDemo}>
            Watch Demo
          </button>
        </div>
      </section>
    </main>
  );
}

export default ProductPage;
