import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Skills } from "@/components/skills";
import { AIPlayground } from "@/components/ai-playground";
import { Process } from "@/components/process";
import { Philosophy } from "@/components/philosophy";
import { GitHubActivity } from "@/components/github-activity";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

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
