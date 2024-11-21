// components/SliderPreview.tsx
import { MutableRefObject } from "react";

interface SliderPreviewProps {
  slidePreviewRef: MutableRefObject<HTMLDivElement | null>;
  prevSlidesRef: MutableRefObject<HTMLDivElement[]>;
}

export default function SliderPreview({
  slidePreviewRef,
  prevSlidesRef,
}: SliderPreviewProps) {
  return (
    <div ref={slidePreviewRef} className="slider-preview">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) prevSlidesRef.current[index] = el;
          }}
          className={`preview ${index === 0 ? "active" : ""}`}
        >
          <img src={`/assets/img${index + 1}.jpg`} alt="" />
        </div>
      ))}
    </div>
  );
}
