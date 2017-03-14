import React from 'react';
import Carousel from 'nuka-carousel';

class CustomCarousel extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    const carouselContent = this.props.content.map(content => (
      <div>
        {content}
      </div>
      ));

    // Left and right arrows for the carousel element
    const decorators = [{
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
        decorators={this.props.decorators || decorators}
        slidesToShow={this.props.slidesToShow}
        slideWidth={this.props.slideWidth}
        className={this.props.className}
      >
        {carouselContent}
      </Carousel>

    );
  }
}


export default CustomCarousel;
