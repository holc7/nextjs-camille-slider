import { useState, useEffect } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

export const useSlider = (
  sliderImagesRef: React.RefObject<HTMLDivElement>,
  counterRef: React.RefObject<HTMLDivElement>,
  titlesRef: React.RefObject<HTMLDivElement>,
  prevSlidesRef: React.MutableRefObject<HTMLDivElement[]>,
  totalSlides: number
) => {
  const [currentImg, setCurrentImg] = useState<number>(1);
  const [indicatorRotation, setIndicatorRotation] = useState<number>(0);

  useGSAP(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
      "hop",
      "M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1"
    );
  }, []);

  useEffect(() => {
    updateCounterAndTitlePosition();
    updateActiveSlidePreview();
  }, [currentImg]);

  const updateCounterAndTitlePosition = () => {
    const counterY = -20 * (currentImg - 1);
    const titleY = -60 * (currentImg - 1);

    if (counterRef.current) {
      gsap.to(counterRef.current, {
        y: counterY,
        duration: 1,
        ease: "hop",
      });
    }

    if (titlesRef.current) {
      gsap.to(titlesRef.current, {
        y: titleY,
        duration: 1,
        ease: "hop",
      });
    }
  };

  const updateActiveSlidePreview = () => {
    prevSlidesRef.current.forEach((prev) => prev.classList.remove("active"));
    if (prevSlidesRef.current[currentImg - 1]) {
      prevSlidesRef.current[currentImg - 1].classList.add("active");
    }
  };

  const animateSlide = (direction: string, newImg: number) => {
    if (!sliderImagesRef.current) return;

    const currentSlide = sliderImagesRef.current
      .lastElementChild as HTMLDivElement;

    const slideImg = document.createElement("div");
    slideImg.classList.add("img");

    const slideImgElem = document.createElement("img");
    slideImgElem.src = `/assets/img${newImg}.jpg`;
    gsap.set(slideImgElem, { x: direction === "left" ? -500 : 500 });

    slideImg.appendChild(slideImgElem);
    sliderImagesRef.current.appendChild(slideImg);

    if (currentSlide) {
      gsap.to(currentSlide.querySelector("img"), {
        x: direction === "left" ? 500 : -500,
        duration: 1.5,
        ease: "hop",
      });
    }

    gsap.fromTo(
      slideImg,
      {
        clipPath:
          direction === "left"
            ? "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
            : "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
      },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.5,
        ease: "hop",
      }
    );
    gsap.to(slideImgElem, {
      x: 0,
      duration: 1.5,
      ease: "hop",
    });

    cleanupSlides();

    setIndicatorRotation(
      (prevRotation) => prevRotation + (direction === "left" ? -90 : 90)
    );
  };

  const cleanupSlides = () => {
    if (!sliderImagesRef.current) return;

    const imgElements = sliderImagesRef.current.querySelectorAll(".img");
    if (imgElements.length > totalSlides) {
      imgElements[0].remove();
    }
  };

  return {
    currentImg,
    setCurrentImg,
    indicatorRotation,
    animateSlide,
  };
};
