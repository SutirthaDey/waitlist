import { WORKFLOW_STEPS } from "../constants/productSections";

function ProductPage({ onOpenDemo }) {
  return (
    <main className="product-page">
      <section className="product-card">
        <header className="product-hero">
          <p className="product-tag">Product Overview</p>
          <h1>
            <span className="title-accent">Create launch-ready ad videos</span> in
            minutes, not weeks.
          </h1>
          <p className="product-lead">
            Zorvee helps teams build realistic, high-converting product videos from one
            platform. It replaces fragmented scripting, voice, localization, and editing
            workflows. Your team ships more campaigns with less effort.
          </p>
        </header>

        <div className="product-sections">
          <section className="product-block block-workflow">
            <h2>
              <span className="block-kicker">How It Works</span>
              How it works in 3 simple steps
            </h2>
            <p className="block-intro">
              Clear workflow from product input to final campaign video.
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
            Watch Demo
          </button>
        </div>
      </section>
    </main>
  );
}

export default ProductPage;
