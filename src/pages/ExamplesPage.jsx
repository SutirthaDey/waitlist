import { useMemo, useState } from "react";

function ExamplesPage({ categories, onOpenVideo }) {
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0]?.id ?? "");

  const activeCategory = useMemo(() => {
    return categories.find((category) => category.id === activeCategoryId) ?? categories[0];
  }, [activeCategoryId, categories]);

  if (!categories.length || !activeCategory) {
    return (
      <main className="examples-page">
        <section className="examples-card">
          <p className="examples-tag">See Examples</p>
          <h1>Video Library</h1>
          <p>Examples are being prepared. Please check back shortly.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="examples-page">
      <section className="examples-card">
        <p className="examples-tag">See Examples</p>
        <h1>
          <span className="title-accent">Content Library</span> By Category
        </h1>

        <div className="examples-categories" role="tablist" aria-label="Video categories">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={activeCategory.id === category.id}
              className={activeCategory.id === category.id ? "active" : ""}
              onClick={() => setActiveCategoryId(category.id)}
            >
              <span>{category.label}</span>
              <small>{category.videos.length} videos</small>
            </button>
          ))}
        </div>

        <p className="examples-category-description">{activeCategory.description}</p>

        <div className="examples-grid">
          {activeCategory.videos.map((video) => (
            <article key={video.id} className="example-video-card">
              <button
                type="button"
                className="example-video-trigger"
                onClick={() => onOpenVideo(video.src)}
                aria-label={`Play ${video.title}`}
              >
                <video
                  className="example-video-preview"
                  src={video.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <span className="video-overlay-label" aria-hidden="true">
                  ▶
                </span>
              </button>
              <div className="example-video-content">
                <h3>{video.title}</h3>
                <p>{video.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default ExamplesPage;
