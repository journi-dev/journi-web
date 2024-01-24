export const priceInfo = new Map([
  [
    "Base",
    {
      discountMinMonthlyCharge: 375,
      discountRate: 0.025,
      standardMinMonthlyCharge: 450,
      standardRate: 0.03,
      startupFee: 500,
    },
  ],
  [
    "Plus",
    {
      discountMinMonthlyCharge: 500,
      discountRate: 0.0333,
      standardMinMonthlyCharge: 750,
      standardRate: 0.05,
      startupFee: 750,
    },
  ],
  [
    "Max",
    {
      discountMinMonthlyCharge: 750,
      discountRate: 0.05,
      standardMinMonthlyCharge: 1500,
      standardRate: 0.1,
      startupFee: 750,
    },
  ],
]);