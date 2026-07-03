import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { BenefitsShowcase } from "@/components/sections/BenefitsShowcase";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProblemSolution />
        <BenefitsShowcase />
      </main>
    </>
  );
}