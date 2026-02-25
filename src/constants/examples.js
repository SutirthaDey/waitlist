const CATEGORY_LABELS = {
  fragrance: "Fragrance",
  beauty: "Beauty",
  clothing: "Clothing",
  jewellery: "Jewellery",
};

const CATEGORY_DESCRIPTIONS = {
  fragrance: "Perfume and scent-focused product ads built for short-form campaigns.",
  beauty: "Skincare and beauty-focused creatives with clear benefits and CTA flow.",
  clothing: "Fashion and apparel promos for launches, offers, and seasonal drops.",
  jewellery: "Premium product showcases designed for high-intent social audiences.",
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

  return {
    id: categoryId,
    label: CATEGORY_LABELS[categoryId] ?? categoryId,
    description:
      CATEGORY_DESCRIPTIONS[categoryId] ??
      "Category based examples from your public videos.",
    videos: files.map((fileName, index) => ({
      id: `${categoryId}-${index + 1}`,
      title: `${CATEGORY_LABELS[categoryId] ?? categoryId} Example ${index + 1}`,
      summary: `Sample ${CATEGORY_LABELS[categoryId] ?? categoryId} marketing video.`,
      src: `/${categoryId}/${fileName}`,
    })),
  };
});
