import React, { useEffect, useState } from "react";
import "./Slider.scss";
import { BiSolidChevronLeft, BiSolidChevronRight } from "react-icons/bi";
import { sliderData } from "./slider-data";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderLength = sliderData.length;

  let autoScroll = true;
  let sliderIntervel;
  let intervel = 5000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === sliderLength - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? sliderLength - 1 : currentSlide - 1);
  };

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
        sliderIntervel = setInterval(() => {
          nextSlide();
        }, intervel);
    }
    return () => clearInterval(sliderIntervel);
  }, [currentSlide, sliderIntervel]);

  return (
    <div className="slider">
      <span className="prev arrow" onClick={prevSlide}>
        <BiSolidChevronLeft />
      </span>
      <span className="next arrow" onClick={nextSlide}>
        <BiSolidChevronRight />
      </span>
      {sliderData.map((slide, index) => {
        const { image, heading, desc } = slide;
        return (
          <div
            key={index}
            className={index === currentSlide ? "slide current" : "slide"}
          >
            {index === currentSlide && (
              <>
                <img src={image} alt="slide" />
                <div className="content">
                  <h2>{heading}</h2>
                  <p>{desc}</p>
                  <hr />
                  <a href="#product" className="--btn --btn-red">
                    Shop Now
                  </a>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
