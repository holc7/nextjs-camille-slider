import Image from "next/image";
import { forwardRef } from "react";

interface SliderPreviewProps {
  totalSlides: number;
  currentImage: number;
}

export const SliderPreview = forwardRef<HTMLDivElement, SliderPreviewProps>(
  ({ totalSlides, currentImage }, ref) => {
    return (
      <div className="slider-preview" ref={ref}>
        {Array.from({ length: totalSlides }, (_, i) => (
          <div
            key={i}
            className={`preview ${currentImage === i + 1 ? "active" : ""}`}
          >
            <Image
              src={`/assets/img${i + 1}.jpg`}
              alt=""
              width={100}
              height={100}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        ))}
      </div>
    );
  }
);

SliderPreview.displayName = "SliderPreview";
