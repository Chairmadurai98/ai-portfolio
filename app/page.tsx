import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { AIPlayground } from "@/components/sections/ai-playground";
import { Process } from "@/components/sections/process";
import { Philosophy } from "@/components/sections/philosophy";
import { GitHubActivity } from "@/components/sections/github-activity";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#08090a] text-[#ededed]">
      {/* Sticky Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative">
        <Hero />
        <Projects />
        <About />
        <Experience />
        <Skills />
        <AIPlayground />
        <Process />
        <Philosophy />
        <GitHubActivity />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
