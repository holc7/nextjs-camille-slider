// components/SliderImages.tsx
import { MutableRefObject } from "react";

interface SliderImagesProps {
  sliderImagesRef: MutableRefObject<HTMLDivElement | null>;
  currentImg: number;
}

export default function SliderImages({
  sliderImagesRef,
  currentImg,
}: SliderImagesProps) {
  return (
    <div ref={sliderImagesRef} className="slider-images">
      <div className="img">
        <img src={`/assets/img${currentImg}.jpg`} alt="" />
      </div>
    </div>
  );
}
