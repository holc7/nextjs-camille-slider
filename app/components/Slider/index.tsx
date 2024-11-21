// components/Slider/index.tsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase";
import { SliderImages } from "./SliderImages";
import { SliderTitle } from "./SliderTitle";
import { SliderCounter } from "./SliderCounter";
import { SliderPreview } from "./SliderPreview";
import { SliderIndicators } from "./SliderIndicators";

export const Slider = () => {
  const [currentImg, setCurrentImg] = useState(1);
  const totalSlides = 5;
  const indicatorRotationRef = useRef(0);
  const isAnimatingRef = useRef(false);

  const sliderImagesRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const titlesRef = useRef<HTMLDivElement>(null);
  const indicatorRefs = [
    useRef<HTMLParagraphElement>(null),
    useRef<HTMLParagraphElement>(null),
  ];
  const slidePreviewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
      "hop",
      "M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1"
    );
  }, []);

  const updateCounterAndTitlePosition = () => {
    gsap.to(counterRef.current, {
      y: -20 * (currentImg - 1),
      duration: 1,
      ease: "hop",
    });

    gsap.to(titlesRef.current, {
      y: -60 * (currentImg - 1),
      duration: 1,
      ease: "hop",
    });
  };

  const updateActiveSlidePreview = () => {
    const previews = document.querySelectorAll(".slider-preview .preview");
    previews.forEach((prev) => prev.classList.remove("active"));
    previews[currentImg - 1]?.classList.add("active");
  };

  const animateSlide = (direction: "left" | "right") => {
    if (!sliderImagesRef.current || isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const container = sliderImagesRef.current;
    const currentSlide = container.querySelector(".img") as HTMLElement;

    const newSlide = document.createElement("div");
    newSlide.classList.add("img");

    const newImage = document.createElement("img");
    newImage.src = `/assets/img${currentImg}.jpg`;
    newSlide.appendChild(newImage);

    gsap.set(newSlide, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
    });

    gsap.set(newImage, {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      x: direction === "left" ? -container.offsetWidth : container.offsetWidth,
    });

    container.appendChild(newSlide);

    gsap.to(currentSlide, {
      x: direction === "left" ? container.offsetWidth : -container.offsetWidth,
      duration: 1,
      ease: "hop",
    });

    gsap.to(newImage, {
      x: 0,
      duration: 1,
      ease: "hop",
      onComplete: () => {
        currentSlide.remove();
        gsap.set(newSlide, { clearProps: "position" });
        isAnimatingRef.current = false;
      },
    });

    // Animate indicators
    indicatorRotationRef.current += direction === "left" ? -90 : 90;
    gsap.to(
      indicatorRefs.map((ref) => ref.current),
      {
        rotate: indicatorRotationRef.current,
        duration: 1,
        ease: "hop",
      }
    );
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isAnimatingRef.current) return;

    const sliderWidth = event.currentTarget.clientWidth;
    const clickPosition = event.clientX;

    if (slidePreviewRef.current?.contains(event.target as Node)) {
      const clickedPrev = (event.target as Element).closest(".preview");
      if (!clickedPrev) return;

      const clickedIndex =
        Array.from(
          document.querySelectorAll(".slider-preview .preview")
        ).indexOf(clickedPrev) + 1;

      if (clickedIndex !== currentImg) {
        const direction = clickedIndex < currentImg ? "left" : "right";
        setCurrentImg(clickedIndex);
        updateCounterAndTitlePosition();
        updateActiveSlidePreview();
        animateSlide(direction);
      }
      return;
    }

    if (clickPosition < sliderWidth / 2 && currentImg > 1) {
      setCurrentImg((prev) => prev - 1);
      updateCounterAndTitlePosition();
      updateActiveSlidePreview();
      animateSlide("left");
    } else if (clickPosition > sliderWidth / 2 && currentImg < totalSlides) {
      setCurrentImg((prev) => prev + 1);
      updateCounterAndTitlePosition();
      updateActiveSlidePreview();
      animateSlide("right");
    }
  };

  return (
    <div className="slider" onClick={handleClick}>
      <SliderImages ref={sliderImagesRef} currentImage={currentImg} />
      <SliderTitle ref={titlesRef} />
      <SliderCounter ref={counterRef} totalSlides={totalSlides} />
      <SliderPreview
        ref={slidePreviewRef}
        totalSlides={totalSlides}
        currentImage={currentImg}
      />
      <SliderIndicators refs={indicatorRefs} />
    </div>
  );
};
