import React, { Component } from 'react'
import { FlexGrid, Svg } from 'components'
import { classNames } from 'helpers'
import s from './Slider.sass'

import arrowIcon from 'icons/ui/arrow-right.svg'

export default class Slider extends Component {
  static defaultProps = {
    data: [1,2,3,4,5]
  };

  state = {current: 0};

  slides = [];
  dur = .3; ease = Cubic.easeOut;

  getSlideRef = index => b =>
    this.slides[index] = b;


  to = __index => {
    const {
      dur, ease,
      props: { getCurrentSlide },
      state: { current },
      slides
    } = this;

    const maxSlide = slides.length - 1;
    let index = __index < 0
      ? maxSlide
      : __index > maxSlide
        ? 0 : __index;

    slides.forEach((slide, key) => {
      let animation = {
        opacity: 0,
        display: 'none',
        ease
      };

      if (key === index) {
        animation = {
          opacity: 1,
          display: 'block',
          ease
        };

        this.setState({current: index}, () => {
          if (getCurrentSlide) {
            getCurrentSlide(index);
          }
        });
      }

      TweenMax.to(slide, dur, animation)
    });
  };

  componentDidMount() {
    this.to(0);
  }

  componentWillMount() {
    document.addEventListener('keydown', this.keyPressHandler)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyPressHandler)
  }

  getWrapperRef = b => {
    this.wrapper = b;

    if (this.props.getWrapperRef) {
      this.props.getWrapperRef(b);
    }
  };

  nextControlHandler = () => {
    this.to(this.state.current + 1)
  };
  prevControlHandler = () => {
    this.to(this.state.current - 1)
  };

  keyPressHandler = e => {
    if (!this.isFocus)
      return;

    const isNext = e.key.toLowerCase().indexOf('right') !== -1;

    if (isNext) {
      return this.nextControlHandler();
    }

    return this.prevControlHandler();
  };

  mouseEnterHandler = () => this.isFocus = true;
  mouseLeaveHandler = () => this.isFocus = false;

  render() {
    const {
      props: {
        data, className,
        onMouseMove,
      },
      state: { current },
      getSlideRef, getWrapperRef,
      to, nextControlHandler,
      prevControlHandler,
      mouseEnterHandler,
      mouseLeaveHandler
    } = this;

    const needNav = !!(data && data.length > 1);

    return (
      <div ref={getWrapperRef} onMouseMove={onMouseMove}
           onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}
           className={classNames(s.wrapper, className)}>
        <div className={s.frame}>
          {data.map((item, index) => (
            <div ref={getSlideRef(index)} key={index} className={s.slide}>
              {item}
            </div>
          ))}
          {needNav && <div className={s.controls}>
            <Svg src={arrowIcon} onClick={prevControlHandler}
                 className={s.control_prev} />
            <Svg src={arrowIcon} onClick={nextControlHandler}
                 className={s.control_next} />
          </div>}
        </div>
        {needNav && <FlexGrid justify="center" align="center"
                              className={s.nav}>
          {data.map((item, index) => (
            <div onClick={() => to(index)} key={index}
                 className={classNames(s.nav__item, index === current && s.nav__item_active)} />
          ))}
        </FlexGrid>}
      </div>
    )
  }
}

