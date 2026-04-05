import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { ToolsPreview } from "@/components/sections/ToolsPreview";
import { Timeline } from "@/components/sections/Timeline";
import { Contact } from "@/components/sections/Contact";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function HomePage() {
  return (
    <main>
      <ScrollReveal />
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Projects />
      <ToolsPreview />
      <Timeline />
      <Contact />
      <Footer />
    </main>
  );
}
