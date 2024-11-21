// components/SliderImages.tsx
import React from "react";

const SliderImages = React.forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="slider-images">
      <div className="img">
        <img src="/assets/img1.jpg" alt="" />
      </div>
    </div>
  );
});

SliderImages.displayName = "SliderImages";
export default SliderImages;
