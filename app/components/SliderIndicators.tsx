import React from "react";

interface SliderIndicatorsProps {
  indicatorsRef: React.MutableRefObject<HTMLParagraphElement[]>;
}

const SliderIndicators: React.FC<SliderIndicatorsProps> = ({
  indicatorsRef,
}) => {
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
};

export default SliderIndicators;
