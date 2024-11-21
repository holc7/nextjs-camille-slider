import React from "react";

interface SliderTitleProps {
  ref: React.RefObject<HTMLDivElement>;
}

const SliderTitle = React.forwardRef<
  HTMLDivElement,
  Omit<SliderTitleProps, "ref">
>((_, ref) => {
  return (
    <div className="slider-title">
      <div ref={ref} className="slider-title-wrapper">
        <p>The Revival Ensemble</p>
        <p>Above The Canvas</p>
        <p>Harmony in Every Note</p>
        <p>Redefining Imagination</p>
        <p>From Earth to Expression</p>
      </div>
    </div>
  );
});

SliderTitle.displayName = "SliderTitle";
export default SliderTitle;
