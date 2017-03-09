import React from 'react';
import Carousel from 'nuka-carousel';

function CustomCarousel() {
  // Left and right arrows for the carousel element
  const decorators = [{
    component: () => (
      <i className="material-icons prevArrow" onClick={this.props.previousSlide}>keyboard_arrow_left</i>
        ),
    position: 'TopLeft',
  },
  {
    component: () => (
      <i className="material-icons nextArrow" onClick={this.props.nextSlide}>keyboard_arrow_right</i>
        ),
    position: 'TopRight',
  },
  ];

  const carouselContent = this.props.content.map(content => (
    <div>
      {content}
    </div>
  ));


  return (


    <Carousel
      decorators={this.props.decorators || decorators}
      slidesToShow={this.props.slidesToShow}
      slideWidth={this.props.slideWidth}
      className={this.props.className}
    >
      {carouselContent}
    </Carousel>

  );
}

export default CustomCarousel;
