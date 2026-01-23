import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { LogosSection } from "@/components/home/LogosSection";
import { CVBuilderPreview } from "@/components/home/CVBuilderPreview";
import { CareerAcceleratorTeaser } from "@/components/home/CareerAcceleratorTeaser";
import { TargetAudience } from "@/components/home/TargetAudience";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <LogosSection />
      <CVBuilderPreview />
      <CareerAcceleratorTeaser />
      <TargetAudience />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
