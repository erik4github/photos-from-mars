import React from 'react';
import './cards.css';
import { debounce, isElementInViewport } from '../utility/utility.js';
import placeholderSVG from '../../assets/placeholder.svg';

export class Cards extends React.Component {
  constructor(props) {
    super(props);

    this.lazyLoadFallback = debounce(this.lazyLoadFallback.bind(this), 500);
    this.handleIntersection = this.handleIntersection.bind(this);
    this.card = React.createRef();
  }

  handleIntersection() {
    const observerConfig = { threshold: 0.5 };
    let lazyLoadObserver = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        let observedCard = entries[0].target;
        let cardChildElements = observedCard.children;
        let img = cardChildElements[0];
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        lazyLoadObserver.unobserve(this.card.current);
      }
    }, observerConfig);
    lazyLoadObserver.observe(this.card.current);
  }

  lazyLoadFallback() {
    if (isElementInViewport(this.card)) {
      let observedCard = this.card.current;
      let cardChildElements = observedCard.children;
      let img = cardChildElements[0];
      img.src = img.dataset.src;
      img.classList.remove('lazy');
    }
  }

  componentDidMount() {
    if ('IntersectionObserver' in window) {
      this.handleIntersection();
    } else {
      this.lazyLoadFallback();
      window.addEventListener('scroll', this.lazyLoadFallback);
      window.addEventListener('resize', this.lazyLoadFallback);
      window.addEventListener('click', this.lazyLoadFallback);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.lazyLoadFallback);
    window.removeEventListener('resize', this.lazyLoadFallback);
    window.removeEventListener('click', this.lazyLoadFallback);
  }

  render() {
    return (
      <div ref={this.card} className={this.props.filters.includes(this.props.cameraAbbreviation) ? 'hidden card' : 'card'} datatype-camera={this.props.cameraAbbreviation}>
        <img
          className="card-img-top lazy"
          data-src={this.props.src}
          src={placeholderSVG}
          alt={this.props.cameraAbbreviation}
        />
        <div className="card-body">
          <p className="card-text">
            Sol: {this.props.sol}
          </p>
          <p className="card-text">
            Earth Date: {this.props.earthDate}
          </p>
          <p className="card-text">
            {this.props.camera} ({this.props.cameraAbbreviation})
          </p>
          <a href={this.props.src} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            View Full Size
          </a>
        </div>
      </div>
    );
  }
}
