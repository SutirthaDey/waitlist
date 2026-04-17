const CATEGORY_LABELS = {
  fragrance: "Fragrance",
  beauty: "Beauty",
  clothing: "Clothing",
  jewellery: "Jewellery",
  miscellaneous: "Miscellaneous",
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
  miscellaneous:
    "Mixed-format sample videos for additional styles, hooks, and creator-led storytelling angles.",
};

const CATEGORY_VIDEO_FILES = {
  fragrance: ["frag1.mp4", "frag2.mp4", "frag3.mp4"],
  beauty: ["beauty1.mp4", "beauty2.mp4", "beauty3.mp4", "beauty4.mp4"],
  clothing: ["clothing1.mp4", "clothing2.mp4"],
  jewellery: ["jewe1.mp4", "jewellery3.mp4"],
  miscellaneous: ["mis_1.mp4", "mis_2.mp4", "mis_3.mp4", "mis_4.mp4", "mis_5.mp4"],
};

const CATEGORY_ORDER = ["beauty", "fragrance", "clothing", "jewellery", "miscellaneous"];

export const EXAMPLE_VIDEO_CATEGORIES = CATEGORY_ORDER.map((categoryId) => {
  const files = CATEGORY_VIDEO_FILES[categoryId] ?? [];
  const categoryLabel = CATEGORY_LABELS[categoryId] ?? categoryId;
  const titleByCategory = {
    fragrance: ["Signature Fragrance Launch", "Evening Scent Collection"],
    beauty: [
      "Daily Skincare Ritual",
      "Hydration Boost Routine",
      "Clinical Glow Serum Spotlight",
      "Hydration Recovery Essentials",
    ],
    clothing: ["Seasonal Collection Drop", "Urban Layers Lookbook"],
    jewellery: ["Fine Jewellery Gift Edit", "Bridal Gold Signature Set"],
    miscellaneous: [
      "Lifestyle Product Highlight",
      "Creator Testimonial Style",
      "Problem-Solution Quick Cut",
      "Offer-Led Performance Variant",
      "Social Proof Storyline",
    ],
  };
  const summaryByCategory = {
    fragrance: [
      "Creator-style concept highlighting scent notes, mood, and daily wear context.",
      "Short-form video crafted for premium positioning and faster purchase intent.",
    ],
    beauty: [
      "Problem-solution storytelling focused on ingredients, outcomes, and routine fit.",
      "Routine-driven creative emphasizing hydration results and daily-use relevance.",
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
    miscellaneous: [
      "Flexible short-form concept blending product context, creator tone, and conversion intent.",
      "Authentic presenter-led narrative designed to build trust in under 30 seconds.",
      "Fast-paced ad concept using pain-point framing followed by clear product positioning.",
      "Offer-forward cut optimized for performance testing across social and paid channels.",
      "Community-style story focused on outcomes, credibility signals, and simple CTA flow.",
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
