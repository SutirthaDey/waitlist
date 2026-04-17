const CATEGORY_LABELS = {
  fragrance: "Fragrance",
  beauty: "Beauty",
  clothing: "Clothing",
  jewellery: "Jewellery",
};

const CATEGORY_DESCRIPTIONS = {
  fragrance:
    "Done-for-you fragrance videos designed to feel premium while staying creator-authentic.",
  beauty:
    "Beauty-focused UGC-style videos built around benefits, trust, and conversion-friendly hooks.",
  clothing:
    "Creator-style apparel videos tailored for launches, drops, and high-scroll social feeds.",
  jewellery:
    "Jewellery videos balancing premium feel with relatable storytelling for high-intent shoppers.",
};

const CATEGORY_VIDEO_FILES = {
  fragrance: ["frag1.mp4", "frag2.mp4"],
  beauty: ["beauty1.mp4", "beauty3.mp4", "beauty4.mp4"],
  clothing: ["clothing1.mp4", "clothing2.mp4"],
  jewellery: ["jewe1.mp4", "jewellery3.mp4"],
};

const CATEGORY_ORDER = ["beauty", "clothing", "jewellery", "fragrance"];

export const EXAMPLE_VIDEO_CATEGORIES = CATEGORY_ORDER.map((categoryId) => {
  const files = CATEGORY_VIDEO_FILES[categoryId] ?? [];
  const categoryLabel = CATEGORY_LABELS[categoryId] ?? categoryId;
  const titleByCategory = {
    fragrance: ["Signature Fragrance Launch", "Evening Scent Collection"],
    beauty: [
      "Daily Skincare Ritual",
      "Clinical Glow Serum Spotlight",
      "Hydration Recovery Essentials",
    ],
    clothing: ["Seasonal Collection Drop", "Urban Layers Lookbook"],
    jewellery: ["Fine Jewellery Gift Edit", "Bridal Gold Signature Set"],
  };
  const summaryByCategory = {
    fragrance: [
      "Creator-style concept highlighting scent notes, mood, and daily wear context.",
      "Short-form video crafted for premium positioning and faster purchase intent.",
    ],
    beauty: [
      "Problem-solution storytelling focused on ingredients, outcomes, and routine fit.",
      "Trust-first product narrative built for high-retention Reels and Shorts viewing.",
      "Routine-led creative highlighting texture, application, and visible after-use finish.",
    ],
    clothing: [
      "Fast-paced lookbook style showing fit, movement, and complete outfit context.",
      "Street-style storytelling emphasizing layering combinations and repeat-wear versatility.",
    ],
    jewellery: [
      "Elegant product showcase emphasizing craftsmanship, finish quality, and gifting value.",
      "Occasion-led storytelling focused on details, sparkle, and heirloom-style appeal.",
    ],
  };

  return {
    id: categoryId,
    label: categoryLabel,
    description:
      CATEGORY_DESCRIPTIONS[categoryId] ??
      "Category-based sample videos tailored for social-first brand content.",
    videos: files.map((fileName, index) => ({
      id: `${categoryId}-${index + 1}`,
      title:
        titleByCategory[categoryId]?.[index] ??
        `${categoryLabel} Campaign ${index + 1}`,
      summary:
        summaryByCategory[categoryId]?.[index] ??
        `Done-for-you ${categoryLabel.toLowerCase()} video concept for social and paid channels.`,
      src: `/${categoryId}/${fileName}`,
    })),
  };
});
