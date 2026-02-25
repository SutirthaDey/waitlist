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
          <h1>Examples</h1>
          <p>No examples available right now.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="examples-page">
      <section className="examples-card">
        <p className="examples-tag">Examples</p>
        <h1>Explore category-based video examples.</h1>
        <p className="examples-subtext">
          Click a category to filter videos. Fragrance is shown first by default.
        </p>

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
              <div className="example-video-preview-wrap">
                <video
                  className="example-video-preview"
                  src={video.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
              <div className="example-video-content">
                <h3>{video.title}</h3>
                <p>{video.summary}</p>
                <button type="button" onClick={() => onOpenVideo(video.src)}>
                  ▶ Play
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default ExamplesPage;
