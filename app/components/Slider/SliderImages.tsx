import Image from "next/image";
import { forwardRef } from "react";

interface SliderImagesProps {
  currentImage: number;
}

export const SliderImages = forwardRef<HTMLDivElement, SliderImagesProps>(
  ({ currentImage }, ref) => {
    return (
      <div className="slider-images" ref={ref}>
        <div className="img">
          <Image
            src={`/assets/img${currentImage}.jpg`}
            alt=""
            width={500}
            height={300}
            style={{ width: "100%", height: "auto" }}
            priority
          />
        </div>
      </div>
    );
  }
);

SliderImages.displayName = "SliderImages";
