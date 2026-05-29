export interface Collection {
  name: string;
  title: string;
  sub: string;
  bg: string;
  fg: string;
  accent: string;
  p_light: string;
  p_dark: string;
  prev: string;
  next: string;
  price: string;
  imgs: string[];
  models: string[];
}

export const COLLECTIONS: Collection[] = [
  {
    name: "MEN",
    title: "THE_ECLIPSE",
    sub: "URBAN_STREETWEAR_VOL.01",
    bg: "#000000",
    fg: "#f2eee8",
    accent: "#c5a880",
    p_light: "rgba(20, 20, 20, 0.8)",
    p_dark: "rgba(242, 238, 232, 0.1)",
    prev: "WOMEN",
    next: "WOMEN",
    price: "145.00 TND",
    imgs: [
      "/images/598ccfa54b4780d61a0a391d7768e6ea.jpg",
      "/images/fe2af5f55dc10e6438411c2ba8b3dc45.jpg",
      "/images/f812cc870d28da5055fbbb7259ae1ebb.jpg",
    ],
    models: [
      "/images/fe2af5f55dc10e6438411c2ba8b3dc45.jpg",
      "/images/598ccfa54b4780d61a0a391d7768e6ea.jpg",
    ],
  },
  {
    name: "WOMEN",
    title: "THE_ESSENCE",
    sub: "MINIMAL_STREETWEAR_VOL.01",
    bg: "rgba(242, 238, 232, 0.75)" /* Soft Cream */,
    fg: "#2d2a26",
    accent: "#c5a880",
    p_light: "rgba(255, 255, 255, 0.4)",
    p_dark: "rgba(45, 42, 38, 0.2)",
    prev: "MEN",
    next: "MEN",
    price: "125.00 TND",
    imgs: [
      "/images/d81af856f671f045137f4843339c77d3.jpg",
      "/images/a583c395a9133f31190311989d79caa9.jpg",
      "/images/22a9a9710a0a5596583a23521e5fe49d.jpg",
    ],
    models: [
      "/images/22a9a9710a0a5596583a23521e5fe49d.jpg",
      "/images/d81af856f671f045137f4843339c77d3.jpg",
    ],
  },
];
