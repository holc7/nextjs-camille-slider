interface SliderIndicatorsProps {
  refs: React.RefObject<HTMLParagraphElement>[];
}

export const SliderIndicators = ({ refs }: SliderIndicatorsProps) => {
  return (
    <div className="slider-indicators">
      {["+", "+"].map((indicator, index) => (
        <p key={index} ref={refs[index]}>
          {indicator}
        </p>
      ))}
    </div>
  );
};
