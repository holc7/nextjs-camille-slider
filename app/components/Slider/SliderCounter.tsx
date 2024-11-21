import { forwardRef } from "react";

interface SliderCounterProps {
  totalSlides: number;
}

export const SliderCounter = forwardRef<HTMLDivElement, SliderCounterProps>(
  ({ totalSlides }, ref) => {
    return (
      <div className="slider-counter">
        <div className="counter" ref={ref}>
          {Array.from({ length: totalSlides }, (_, i) => (
            <p key={i}>{i + 1}</p>
          ))}
        </div>
        <div>
          <p>—</p>
        </div>
        <div>
          <p>{totalSlides}</p>
        </div>
      </div>
    );
  }
);

SliderCounter.displayName = "SliderCounter";
