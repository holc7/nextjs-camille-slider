// components/SliderCounter.tsx
import { MutableRefObject } from "react";

interface SliderCounterProps {
  counterRef: MutableRefObject<HTMLDivElement | null>;
}

export default function SliderCounter({ counterRef }: SliderCounterProps) {
  return (
    <div className="slider-counter">
      <div ref={counterRef} className="counter">
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
      </div>
      <div>
        <p>&mdash;</p>
      </div>
      <div>
        <p>5</p>
      </div>
    </div>
  );
}
