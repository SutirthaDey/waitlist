import { useEffect, useMemo, useState } from "react";

function ExamplesPage({ categories, onOpenVideo }) {
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0]?.id ?? "");
  const [visibleStart, setVisibleStart] = useState(0);
  const MAX_VISIBLE_VIDEOS = 4;

  const activeCategory = useMemo(() => {
    return categories.find((category) => category.id === activeCategoryId) ?? categories[0];
  }, [activeCategoryId, categories]);

  useEffect(() => {
    setVisibleStart(0);
  }, [activeCategoryId]);

  if (!categories.length || !activeCategory) {
    return (
      <main className="examples-page">
        <section className="examples-card">
          <p className="examples-tag">See Examples</p>
          <h1>Sample Video Library</h1>
          <p>Sample videos are being prepared. Please check back shortly.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="examples-page">
      <section className="examples-card">
        <p className="examples-tag">See Examples</p>
        <h1>
          <span className="title-accent">Sample Videos</span> By Category
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

        {activeCategory.videos.length > MAX_VISIBLE_VIDEOS ? (
          <div className="examples-carousel-controls" aria-label="Video navigation">
            <button
              type="button"
              className="examples-arrow"
              onClick={() => setVisibleStart((current) => Math.max(current - 1, 0))}
              disabled={visibleStart === 0}
              aria-label="Show previous videos"
            >
              <span className="examples-chevron examples-chevron-left" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="examples-arrow"
              onClick={() =>
                setVisibleStart((current) =>
                  Math.min(current + 1, Math.max(activeCategory.videos.length - MAX_VISIBLE_VIDEOS, 0)),
                )
              }
              disabled={visibleStart + MAX_VISIBLE_VIDEOS >= activeCategory.videos.length}
              aria-label="Show next videos"
            >
              <span className="examples-chevron examples-chevron-right" aria-hidden="true" />
            </button>
          </div>
        ) : null}

        <div className="examples-grid">
          {activeCategory.videos
            .slice(visibleStart, visibleStart + MAX_VISIBLE_VIDEOS)
            .map((video) => (
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
