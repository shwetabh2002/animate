/** Editorial / long-form landing pace — calm ease, ~1s durations */
export const editorialEase = [0.25, 0.1, 0.25, 1] as const;

export const viewSlow = {
  duration: 1.1,
  ease: editorialEase,
} as const;

export const viewMedium = {
  duration: 0.85,
  ease: editorialEase,
} as const;

export const viewOnce = {
  once: true,
  margin: "-10% 0px -8% 0px",
  amount: 0.2,
} as const;

export const springSnappy = {
  type: "spring" as const,
  stiffness: 140,
  damping: 20,
};

export const springSoft = {
  type: "spring" as const,
  stiffness: 45,
  damping: 30,
};

export const viewWide = {
  once: true,
  margin: "-12% 0px",
  amount: 0.2,
} as const;
