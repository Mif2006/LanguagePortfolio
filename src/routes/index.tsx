import { createFileRoute } from "@tanstack/react-router";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Languages from "@/components/sections/Languages";
import Pricing from "@/components/sections/Pricing";
import Contact from "@/components/sections/Contact";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen w-screen max-w-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <About />
      <Languages />
      <Pricing />
      <Contact />
    </main>
  );
}
