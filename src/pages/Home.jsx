import React from 'react';
import HeroSlider from '../components/HeroSlider';
import PromotionalSection from '../components/PromotionalSection';
import ProductPromotion from '../components/ProductPromotion';
import BrandCarousel from '../components/BrandCarousel';
import CategorySection from '../components/CategorySection';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <HeroSlider />
      <PromotionalSection />
      <ProductPromotion />
      <BrandCarousel />
      <CategorySection />
    </div>
  );
};

export default Home;
