
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Testimonials from "@/components/home/Testimonials";
import Features from "@/components/home/Features";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      <FeaturedCategories />
      <FeaturedProducts />
      <Testimonials />
    </Layout>
  );
};

export default Index;
