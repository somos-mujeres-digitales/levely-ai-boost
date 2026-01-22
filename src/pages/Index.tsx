import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { LogosSection } from "@/components/home/LogosSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { CVBuilderPreview } from "@/components/home/CVBuilderPreview";
import { CareerAcceleratorTeaser } from "@/components/home/CareerAcceleratorTeaser";
import { TargetAudience } from "@/components/home/TargetAudience";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { PricingSection } from "@/components/home/PricingSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <LogosSection />
      <HowItWorks />
      <BenefitsSection />
      <CVBuilderPreview />
      <CareerAcceleratorTeaser />
      <TargetAudience />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
