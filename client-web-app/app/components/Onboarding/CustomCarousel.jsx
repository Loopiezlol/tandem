import React from 'react';
import Carousel from 'nuka-carousel';

function CustomCarousel({ content, decorators, slidesToShow, slideWidth, className }) {
  const carouselContent = content.map(c => (
    <div key={'carousel'}>
      {c}
    </div>
    ));

  // Left and right arrows for the carousel element
  const _decorators = [{
    component: ({ previousSlide }) => (
      <i className="material-icons prevArrow" onClick={previousSlide}>&#xE314;</i>
          ),
    position: 'TopLeft',
  },
  {
    component: ({ nextSlide }) => (
      <i className="material-icons nextArrow" onClick={nextSlide}>&#xE315;</i>
          ),
    position: 'TopRight',
  },
  ];

  return (
    <Carousel
      decorators={decorators || _decorators}
      slidesToShow={slidesToShow}
      slideWidth={slideWidth}
      className={className}
    >
      {carouselContent}
    </Carousel>
  );
}

export default CustomCarousel;
