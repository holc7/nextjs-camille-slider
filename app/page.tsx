"use client";
import { useRef, MouseEvent } from "react";
import Navigation from "./components/SliderNavigation";
import SliderImages from "./components/SliderImages";
import SliderTitle from "./components/SliderTitle";
import SliderCounter from "./components/SliderCounter";
import SliderPreview from "./components/SliderPreview";
import SliderIndicators from "./components/SliderIndicators";
import { useSlider } from "./hooks/useSlider";

export default function Home() {
  const sliderImagesRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLDivElement | null>(null);
  const titlesRef = useRef<HTMLDivElement | null>(null);
  const indicatorsRef = useRef<HTMLParagraphElement[]>([]);
  const prevSlidesRef = useRef<HTMLDivElement[]>([]);
  const slidePreviewRef = useRef<HTMLDivElement | null>(null);

  const totalSlides = 5;

  const { currentImg, setCurrentImg, animateSlide } = useSlider(
    sliderImagesRef,
    counterRef,
    titlesRef,
    prevSlidesRef,
    totalSlides
  );

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!sliderImagesRef.current || !slidePreviewRef.current) return;

    const sliderWidth = sliderImagesRef.current.clientWidth;
    const clickPosition = event.clientX;

    if (slidePreviewRef.current.contains(event.target as Node)) {
      const clickedPrev = (event.target as HTMLElement).closest(
        ".preview"
      ) as HTMLDivElement;

      if (clickedPrev) {
        const clickedIndex =
          Array.from(prevSlidesRef.current).indexOf(clickedPrev) + 1;

        if (clickedIndex !== currentImg) {
          if (clickedIndex < currentImg) {
            animateSlide("left", clickedIndex);
          } else {
            animateSlide("right", clickedIndex);
          }
          setCurrentImg(clickedIndex);
        }
      }
      return;
    }

    if (clickPosition < sliderWidth / 2 && currentImg !== 1) {
      animateSlide("left", currentImg - 1);
      setCurrentImg((prev) => prev - 1);
    } else if (clickPosition > sliderWidth / 2 && currentImg !== totalSlides) {
      animateSlide("right", currentImg + 1);
      setCurrentImg((prev) => prev + 1);
    }
  };

  return (
    <div onClick={handleClick} className="slider">
      <Navigation />

      <SliderImages ref={sliderImagesRef} />

      <SliderTitle ref={titlesRef} />

      <SliderCounter ref={counterRef} />

      <SliderPreview ref={slidePreviewRef} prevSlidesRef={prevSlidesRef} />

      <SliderIndicators indicatorsRef={indicatorsRef} />
    </div>
  );
}
