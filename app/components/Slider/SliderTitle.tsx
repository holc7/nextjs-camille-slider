import { forwardRef } from "react";

const titles = [
  "The Revival Ensemble",
  "Above The Canvas",
  "Harmony in Every Note",
  "Redefining Imagination",
  "From Earth to Expression",
];

export const SliderTitle = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div className="slider-title">
      <div className="slider-title-wrapper" ref={ref}>
        {titles.map((title, index) => (
          <p key={index}>{title}</p>
        ))}
      </div>
    </div>
  );
});

SliderTitle.displayName = "SliderTitle";
