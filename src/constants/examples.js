const CATEGORY_LABELS = {
  fragrance: "Fragrance",
  beauty: "Beauty",
  clothing: "Clothing",
  jewellery: "Jewellery",
};

const CATEGORY_DESCRIPTIONS = {
  fragrance:
    "High-aesthetic fragrance creatives designed for premium storytelling and social conversion.",
  beauty:
    "Benefit-led beauty videos that combine education, trust signals, and clear purchase intent.",
  clothing:
    "Style-forward apparel campaigns tailored for launches, seasonal drops, and paid social.",
  jewellery:
    "Luxury-focused product showcases crafted for high-intent audiences and gifting moments.",
};

const CATEGORY_VIDEO_FILES = {
  fragrance: ["frag1.mp4", "frag2.mp4"],
  beauty: ["beauty1.mp4", "beauty2.mp4"],
  clothing: ["clothing1.mp4"],
  jewellery: ["jewe1.mp4"],
};

const CATEGORY_ORDER = ["fragrance", "beauty", "clothing", "jewellery"];

export const EXAMPLE_VIDEO_CATEGORIES = CATEGORY_ORDER.map((categoryId) => {
  const files = CATEGORY_VIDEO_FILES[categoryId] ?? [];
  const categoryLabel = CATEGORY_LABELS[categoryId] ?? categoryId;
  const titleByCategory = {
    fragrance: ["Signature Fragrance Launch", "Evening Scent Collection"],
    beauty: ["Daily Skincare Ritual", "Clinical Glow Serum Spotlight"],
    clothing: ["Seasonal Collection Drop"],
    jewellery: ["Fine Jewellery Gift Edit"],
  };
  const summaryByCategory = {
    fragrance: [
      "Cinematic brand-forward creative highlighting notes, mood, and wear occasion.",
      "Performance-ready short focused on premium positioning and purchase intent.",
    ],
    beauty: [
      "Problem-solution narrative focused on ingredients, results, and routine fit.",
      "Trust-building product story designed for high-retention short-form channels.",
    ],
    clothing: [
      "Fast-paced lookbook format featuring fit, fabric movement, and styling context.",
    ],
    jewellery: [
      "Elegant showcase emphasizing craftsmanship, finish quality, and gifting appeal.",
    ],
  };

  return {
    id: categoryId,
    label: categoryLabel,
    description:
      CATEGORY_DESCRIPTIONS[categoryId] ??
      "Category based examples from your public videos.",
    videos: files.map((fileName, index) => ({
      id: `${categoryId}-${index + 1}`,
      title:
        titleByCategory[categoryId]?.[index] ??
        `${categoryLabel} Campaign ${index + 1}`,
      summary:
        summaryByCategory[categoryId]?.[index] ??
        `Performance-oriented ${categoryLabel.toLowerCase()} video concept for social and paid channels.`,
      src: `/${categoryId}/${fileName}`,
    })),
  };
});
