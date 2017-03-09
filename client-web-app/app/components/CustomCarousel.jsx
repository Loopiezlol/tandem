import React from 'react';
import Carousel from '../node_modules/nuka-carousel/index.js';

class CustomCarousel extends React.Component {

  constructor (props) {
    super(props);
  }


  render () {

    // Left and right arrows for the carousel element
    const decorators = [{
        component: React.createClass({
          render() {
            return (
              <i className="material-icons prevArrow" onClick={this.props.previousSlide}>keyboard_arrow_left</i>
            );
          }
        }),
        position: 'TopLeft'
      },
      {
        component: React.createClass({
          render() {
            return (
              <i className="material-icons nextArrow" onClick={this.props.nextSlide}>keyboard_arrow_right</i>
            )
          }
        }),
        position: 'TopRight'
      }
    ];

    const carouselContent = this.props.content.map((content, index) => {
      return (
        <div>
            {content}
        </div>
      );
    });


    return (


      <Carousel
       decorators={decorators}
       slidesToShow = {this.props.slidesToShow}
       slideWidth={this.props.slideWidth}
       className={this.props.className}
      >
        {carouselContent}
      </Carousel>

    );
  }




}

export default CustomCarousel;
