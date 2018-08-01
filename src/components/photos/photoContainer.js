import React from 'react';
import { Photos } from './photos';
import { compose } from '../utility/utility';

const withPhotosNull = (Component) => (props) =>
  !props.photos
    ? null
    : <Component {...props} />;

const withPhotosLoading = (Component) => (props) =>
  props.loading
    ? <div><div className="loader"></div><div className="loading-text">Contacting Mars</div></div>
    : <Component {...props} />;

const withPhotosEmpty = (Component) => (props) =>
  !props.photos.length
    ? <div>No images for that day.</div>
    : <Component {...props} />;

const withPhotosConditions = compose(withPhotosLoading, withPhotosNull, withPhotosEmpty);
const HOCPhotos = withPhotosConditions(Photos);

export class PhotoContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <HOCPhotos photos={this.props.photos} loading={this.props.loading} filters={this.props.selectedFilters} />;
  }
}
