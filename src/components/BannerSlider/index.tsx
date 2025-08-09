import { useEffect, useRef, useState, useCallback } from "react";
import { SliderContainer, BannerImage, SliderTrack } from "./styles";

import banner1 from "../../assets/banner1.png";
import banner2 from "../../assets/banner2.png";
import banner3 from "../../assets/banner3.png";

const banners = [
  { id: 1, src: banner1, alt: "Banner 1" },
  { id: 2, src: banner2, alt: "Banner 2" },
  { id: 3, src: banner3, alt: "Banner 3" },
];

export const BannerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<number | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const startAutoPlay = useCallback(() => {
    autoPlayRef.current = setInterval(nextSlide, 3000);
  }, []);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [startAutoPlay, stopAutoPlay]);

  useEffect(() => {
    if (sliderRef.current) {
      const translateX = -currentIndex * 100;
      sliderRef.current.style.transform = `translateX(${translateX}%)`;
    }
  }, [currentIndex]);

  const handleMouseEnter = () => stopAutoPlay();
  const handleMouseLeave = () => startAutoPlay();

  return (
    <SliderContainer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <SliderTrack ref={sliderRef}>
        {banners.map((banner) => (
          <BannerImage key={banner.id} src={banner.src} alt={banner.alt} />
        ))}
      </SliderTrack>
    </SliderContainer>
  );
};
