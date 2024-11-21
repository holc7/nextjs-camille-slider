If you prefer to have everything in one single component:

"use client";
import { useEffect, useRef, useState, MouseEvent } from "react";
import Head from "next/head";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

export default function Home() {
  const sliderImagesRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLDivElement | null>(null);
  const titlesRef = useRef<HTMLDivElement | null>(null);
  const indicatorsRef = useRef<HTMLParagraphElement[]>([]);
  const prevSlidesRef = useRef<HTMLDivElement[]>([]);
  const slidePreviewRef = useRef<HTMLDivElement | null>(null);

  const [currentImg, setCurrentImg] = useState<number>(1);
  const totalSlides = 5;
  const [indicatorRotation, setIndicatorRotation] = useState<number>(0);

  useEffect(() => {
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
    gsap.to(indicatorsRef.current, {
      rotate: indicatorRotation + (direction === "left" ? -90 : 90),
      duration: 1,
      ease: "hop",
    });
  };

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

  const cleanupSlides = () => {
    if (!sliderImagesRef.current) return;

    const imgElements = sliderImagesRef.current.querySelectorAll(".img");
    if (imgElements.length > totalSlides) {
      imgElements[0].remove();
    }
  };

  return (
    <div onClick={handleClick} className="slider">
      <Head>
        <title>Camille Mormal Slider | Codegrid</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="styles.css" />
      </Head>
      <nav>
        <a href="#" id="active">
          Work
        </a>
        <a href="#">About</a>
      </nav>

      <div ref={sliderImagesRef} className="slider-images">
        <div className="img">
          <img src="/assets/img1.jpg" alt="" />
        </div>
      </div>

      <div className="slider-title">
        <div ref={titlesRef} className="slider-title-wrapper">
          <p>The Revival Ensemble</p>
          <p>Above The Canvas</p>
          <p>Harmony in Every Note</p>
          <p>Redefining Imagination</p>
          <p>From Earth to Expression</p>
        </div>
      </div>

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

      <div ref={slidePreviewRef} className="slider-preview">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) prevSlidesRef.current[index] = el;
            }}
            className={`preview ${index === 0 ? "active" : ""}`}
          >
            <img src={`/assets/img${index + 1}.jpg`} alt="" />
          </div>
        ))}
      </div>

      <div className="slider-indicators">
        {[...Array(2)].map((_, i) => (
          <p
            ref={(el) => {
              if (el) indicatorsRef.current[i] = el;
            }}
            key={i}
          >
            +
          </p>
        ))}
      </div>
    </div>
  );
}
