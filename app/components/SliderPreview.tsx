import React from "react";

interface SliderPreviewProps {
  ref: React.RefObject<HTMLDivElement>;
  prevSlidesRef: React.MutableRefObject<HTMLDivElement[]>;
}

const SliderPreview = React.forwardRef<
  HTMLDivElement,
  Omit<SliderPreviewProps, "ref">
>((props, ref) => {
  return (
    <div ref={ref} className="slider-preview">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) props.prevSlidesRef.current[index] = el;
          }}
          className={`preview ${index === 0 ? "active" : ""}`}
        >
          <img src={`/assets/img${index + 1}.jpg`} alt="" />
        </div>
      ))}
    </div>
  );
});

SliderPreview.displayName = "SliderPreview";
export default SliderPreview;
