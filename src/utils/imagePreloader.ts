import { ALL_GAME_IMAGES } from "../constants/gameImages";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";
import logo from "../assets/logo.png";

const BANNER_IMAGES = [banner1, banner2, banner3];
const LOGO_IMAGE = [logo];

export const ALL_STATIC_IMAGES = [
  ...ALL_GAME_IMAGES,
  ...BANNER_IMAGES,
  ...LOGO_IMAGE,
];

export const preloadImages = (imageSrcs: string[]): Promise<void[]> => {
  return Promise.all(
    imageSrcs.map((src) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        img.src = src;
      });
    })
  );
};

export const preloadAllStaticImages = (): Promise<void[]> => {
  return preloadImages(ALL_STATIC_IMAGES);
};