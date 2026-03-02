function ProductPage({ onOpenDemo }) {
  const outcomes = [
    { value: "75%", label: "Less manual production effort" },
    { value: "4x", label: "Faster campaign turnaround" },
    { value: "35+", label: "Languages supported for localization" },
  ];

  const workflowSteps = [
    {
      title: "Add your product context",
      description: "Share product details, audience, and campaign objective.",
    },
    {
      title: "Generate script + presenter",
      description: "Get brand-fit messaging with persona and voice setup in one flow.",
    },
    {
      title: "Create variants at scale",
      description: "Produce multiple language and format versions without rework.",
    },
  ];

  const capabilities = [
    {
      title: "Script Engine",
      description: "Generate ad-ready scripts aligned to offer, audience, and channel.",
    },
    {
      title: "Persona + Voice",
      description: "Use realistic presenters and voice styles that match your brand tone.",
    },
    {
      title: "Localization",
      description: "Create multilingual video variants quickly for every target market.",
    },
    {
      title: "Creative Iteration",
      description: "Test multiple hooks and messaging angles without restarting production.",
    },
    {
      title: "Brand Consistency",
      description: "Keep visual style, message quality, and delivery consistent across campaigns.",
    },
    {
      title: "Export Ready Output",
      description: "Get social and ad-ready videos faster with fewer back-and-forth edits.",
    },
  ];

  const useCases = [
    {
      title: "D2C Brands",
      text: "Launch product ads faster and maintain consistent output during weekly campaign cycles.",
    },
    {
      title: "Agencies",
      text: "Deliver more creative variants per client without increasing team workload.",
    },
    {
      title: "Growth Teams",
      text: "Test, learn, and scale winning creatives quickly across paid and organic channels.",
    },
  ];

  const faqs = [
    {
      question: "Who is Zorvee built for?",
      answer:
        "Zorvee is designed for D2C brands, performance marketers, and content teams that need frequent, on-brand videos without increasing headcount.",
    },
    {
      question: "How does Zorvee reduce time and effort?",
      answer:
        "By automating persona setup, script generation, voice selection, and localization in one platform, teams can reduce manual production effort by up to 75%.",
    },
    {
      question: "Can we keep brand voice and visual consistency?",
      answer:
        "Yes. You can standardize tone, presenter style, format rules, and language output so every campaign follows your brand system.",
    },
    {
      question: "Do we need technical skills to use the platform?",
      answer:
        "No advanced technical setup is required. Marketing and creative teams can operate the workflow through a guided interface.",
    },
    {
      question: "Is this useful for multilingual campaigns?",
      answer:
        "Yes. Zorvee helps generate localized scripts and voice outputs quickly, reducing repetitive production work for each region.",
    },
  ];

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
            platform.
            <br />
            It replaces fragmented scripting, voice, localization, and editing workflows.
            <br />
            Your team ships more campaigns with less effort.
          </p>
        </header>

        <div className="product-sections">
          <section className="product-block block-efficiency">
            <h2>
              <span className="block-kicker">01 | Outcomes</span>
              What you gain with Zorvee
            </h2>
            <div className="efficiency-grid">
              {outcomes.map((metric) => (
                <article key={metric.label} className="efficiency-card">
                  <p className="efficiency-value">{metric.value}</p>
                  <p className="efficiency-label">{metric.label}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="product-block block-workflow">
            <h2>
              <span className="block-kicker">02 | Process</span>
              How it works in 3 simple steps
            </h2>
            <p className="block-intro">
              Clear workflow from product input to final campaign video.
            </p>
            <ol className="product-feature-list">
              {workflowSteps.map((step, index) => (
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

          <section className="product-block block-capabilities">
            <h2>
              <span className="block-kicker">03 | Capabilities</span>
              Everything in one production layer
            </h2>
            <div className="capabilities-grid">
              {capabilities.map((item) => (
                <article key={item.title} className="capability-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="product-block block-use-cases">
            <h2>
              <span className="block-kicker">04 | Use Cases</span>
              Built for teams that scale content
            </h2>
            <div className="use-case-grid">
              {useCases.map((item) => (
                <article key={item.title} className="use-case-card">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="product-block block-faq">
            <h2>
              <span className="block-kicker">05 | FAQ</span>
              Frequently asked questions
            </h2>
            <div className="faq-list">
              {faqs.map((item) => (
                <details key={item.question} className="faq-item">
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
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
