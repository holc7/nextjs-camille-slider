// components/SliderTitle.tsx
import { MutableRefObject } from "react";

interface SliderTitleProps {
  titlesRef: MutableRefObject<HTMLDivElement | null>;
}

export default function SliderTitle({ titlesRef }: SliderTitleProps) {
  return (
    <div className="slider-title">
      <div ref={titlesRef} className="slider-title-wrapper">
        <p>The Revival Ensemble</p>
        <p>Above The Canvas</p>
        <p>Harmony in Every Note</p>
        <p>Redefining Imagination</p>
        <p>From Earth to Expression</p>
      </div>
    </div>
  );
}
