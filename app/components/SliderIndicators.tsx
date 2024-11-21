// components/SliderIndicators.tsx
import { MutableRefObject } from "react";

interface SliderIndicatorsProps {
  indicatorsRef: MutableRefObject<HTMLParagraphElement[]>;
}

export default function SliderIndicators({
  indicatorsRef,
}: SliderIndicatorsProps) {
  return (
    <div className="slider-indicators">
      {[...Array(2)].map((_, i) => (
        <p
          ref={(el) => {
            if (el) indicatorsRef.current[i] = el;
          }}
          key={i}
        >
          +
        </p>
      ))}
    </div>
  );
}
