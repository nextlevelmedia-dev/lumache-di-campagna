import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { BenefitsShowcase } from "@/components/sections/BenefitsShowcase";
import { Differentiators } from "@/components/sections/Differentiators";
import { ProductsGrid } from "@/components/sections/ProductsGrid";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProblemSolution />
        <BenefitsShowcase />
        <Differentiators />
        <ProductsGrid />
      </main>
    </>
  );
}