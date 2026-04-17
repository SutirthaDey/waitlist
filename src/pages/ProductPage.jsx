import { WORKFLOW_STEPS } from "../constants/productSections";

function ProductPage({ onOpenDemo }) {
  return (
    <main className="product-page">
      <section className="product-card">
        <header className="product-hero">
          <p className="product-tag">Service Overview</p>
          <h1>
            <span className="title-accent">Done-for-you UGC-style videos</span> without
            creator delays.
          </h1>
          <p className="product-lead">
            We are a small team of AI experts creating custom short-form videos for your
            brand. You do not need to manage tools, creators, or editing workflows. We
            deliver videos that feel authentic and are ready to post.
          </p>
        </header>

        <div className="product-sections">
          <section className="product-block block-workflow">
            <h2>
              <span className="block-kicker">How It Works</span>
              How it works in 3 simple steps
            </h2>
            <p className="block-intro">
              From your product brief to final Reels and Shorts, we handle the full flow.
            </p>
            <ol className="product-feature-list">
              {WORKFLOW_STEPS.map((step, index) => (
                <li key={step.title}>
                  <div className="feature-head">
                    <span className="feature-number">{index + 1}</span>
                    <span className="feature-tag">{step.title}</span>
                  </div>
                  <span className="feature-desc">{step.description}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <div className="product-actions">
          <button type="button" className="demo-link-btn" onClick={onOpenDemo}>
            Watch Sample
          </button>
        </div>
      </section>
    </main>
  );
}

export default ProductPage;
