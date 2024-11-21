import React from "react";

interface SliderCounterProps {
  ref: React.RefObject<HTMLDivElement>;
}

const SliderCounter = React.forwardRef<
  HTMLDivElement,
  Omit<SliderCounterProps, "ref">
>((_, ref) => {
  return (
    <div className="slider-counter">
      <div ref={ref} className="counter">
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
});

SliderCounter.displayName = "SliderCounter";
export default SliderCounter;
