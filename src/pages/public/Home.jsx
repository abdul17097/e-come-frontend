import React from "react";
import HeroSection        from "../../components/home/HeroSection";
import BrandsSection      from "../../components/home/BrandsSection";
import CategoriesSection  from "../../components/home/CategoriesSection";
import FeaturedProducts   from "../../components/home/FeaturedProducts";
import DealsSection       from "../../components/home/DealsSection";
import FeaturesSection    from "../../components/home/FeaturesSection";
import TestimonialsSection from "../../components/home/TestimonialsSection";
import NewsletterSection  from "../../components/home/NewsletterSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandsSection />
      <CategoriesSection />
      <FeaturedProducts />
      <DealsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}
