export const priceInfo = new Map([
  [
    "Base",
    {
      name: "Base",
      description:
        "Keep up with the times while keeping costs low. Serve your patrons who already know you.",
      discountMinMonthlyCharge: 375,
      discountRate: 2.5,
      standardMinMonthlyCharge: 450,
      standardRate: 3,
      startupFee: 500,
      features: [
        "A custom-built, fully customizable website.",
        "Full access to Journi's WATSON platform to track orders, patrons, and metrics.",
        "A dedicated product manager to assist in managing your business' metrics and platform experience.",
        "Support for your team Mon-Fri from 9 AM to 6 PM.",
      ],
      isFeatured: false,
    },
  ],
  [
    "Plus",
    {
      name: "Plus",
      description:
        "All the basics, plus a little more. Expand your patron base with higher discoverability and more digital mediums.",
      discountMinMonthlyCharge: 500,
      discountRate: 3.33,
      standardMinMonthlyCharge: 750,
      standardRate: 5,
      startupFee: 750,
      features: [
        "A custom-built, companion iOS and Android app, also with full content customization.",
        "Integrations with other business and social media platforms to manage your business storefront and social presence, all from one place.",
        "Support for both your team and your patrons during your business hours.",
      ],
      isFeatured: true,
    },
  ],
  [
    "Max",
    {
      name: "Max",
      description:
        "Maximum sales, maximum metrics, maximum effort. Get everything that Journi has to offer to make your business stand out.",
      discountMinMonthlyCharge: 750,
      discountRate: 5,
      standardMinMonthlyCharge: 1500,
      standardRate: 10,
      startupFee: 750,
      features: [
        "A dedicated marketing analyst to assist in maximizing your business' SEO and other marketing KPIs.",
        "For the first 6 months, pay only 5% fees for each month that you don’t get at least 20 orders.",
        "24/7 support for both your team and your patrons.",
      ],
      isFeatured: false,
    },
  ],
]);
