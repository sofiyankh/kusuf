import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/site/header";
import Footer from "@/components/site/footer";
import RunwayMarquee from "@/components/site/runway-marquee";
import { fetchProducts, type Product } from "@/lib/products";
import { HeroSection } from "@/components/site/hero-section";
import { AtelierSection } from "@/components/site/atelier-section";
import { ManifestoSection } from "@/components/site/manifesto-section";
import { NewArrivalsSection } from "@/components/site/new-arrivals-section";
import { NarrativeSection } from "@/components/site/narrative-section";
import { NewsletterSection } from "@/components/site/newsletter-section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "خسوف Kusuf — تحرّك في صمت" },
      {
        name: "description",
        content:
          "Kusuf علامة تجارية تونسية لملابس الشارع، تجمع بين الجودة الفاخرة والهوية الحضرية.",
      },
    ],
  }),
  loader: async () => {
    const featured = await fetchProducts(6);
    return {
      featured,
    };
  },
  component: HomePage,
});

function HomePage() {
  const { featured } = Route.useLoaderData();

  return (
    <div
      dir="ltr"
      className="min-h-screen w-full font-sans selection:bg-primary/20 antialiased transition-colors duration-1000"
    >
      <Header />

      <main className="flex-1">
        {/* 1. FLAGSHIP HERO SECTION */}
        <HeroSection />

        {/* 2. REFINED ATELIER BANNER */}
        <AtelierSection />

        {/* 3. RUNWAY MARQUEE */}
        <RunwayMarquee />

        {/* 4. MOVE IN SILENCE (The Manifesto) */}
        <ManifestoSection />

        {/* 5. RUNWAY NEW ARRIVALS */}
        <NewArrivalsSection featured={featured} />

        {/* 6. Kusuf NARRATIVE */}
        <NarrativeSection />

        {/* 7. NEWSLETTER */}
        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
}
