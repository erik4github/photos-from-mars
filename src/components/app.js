import React from 'react';
import { RoverForm } from './form/form';
import { PhotoContainer } from './photos/photoContainer';
import { Sidebar } from './sidebar/sidebar';
import { Toggler } from './toggler/toggler';
import { debounce } from './utility/utility';
import { getNewPhotos } from './api/getNewPhotos';
import { getLatestPhotos } from './api/getLatestPhotos';
import 'bootstrap/dist/css/bootstrap.min.css';

const cameras = [
  'FHAZ',
  'RHAZ',
  'MAST',
  'CHEMCAM',
  'MAHLI',
  'MARDI',
  'NAVCAM',
  'PANCAM',
  'MINITES'
];

const selectedFilters = [];

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      loading: false,
      cameras: cameras,
      selectedFilters: [],
      collapsed: true,
      navbarHeight: '',
      height: ''
    };
    this.getLatestPhotos = this.getLatestPhotos.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkFilters = this.checkFilters.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.setHeight = this.setHeight.bind(this);
    this.navbar = React.createRef();
  }

  handleSubmit(event) {
    event.preventDefault();
    // if using direct NASA API rather than heroku app
    // let formData = Array.from(new FormData(event.target), (e) => e.map(encodeURIComponent).join('=')).join('&');
    let formData = Array.from(new FormData(event.target), (e) => e.reduce((acc, cv) => cv));
    let rover = formData[0];
    let sol = formData[1];

    this.setState({ loading: true });

    getNewPhotos(rover, sol)
      .then((photos) =>
        this.setState({ loading: false, photos: photos })
      )
      .catch((error) => {
        console.error(error);
        this.setState({ loading: false });
      });
  }

  getLatestPhotos() {
    this.setState({ loading: true });

    getLatestPhotos()
      .then((photos) =>
        this.setState({ loading: false, photos: photos })
      )
      .catch((error) => {
        console.error(error);
        this.setState({ loading: false });
      });
  }

  checkFilters(event) {
    const checkbox = event.target;
    if (checkbox.checked) {
      selectedFilters.push(checkbox.value);
    } else if (!checkbox.checked) {
      const unselectedCheckbox = selectedFilters.indexOf(checkbox.value);
      selectedFilters.splice(unselectedCheckbox, 1);
    }
    this.setState({ selectedFilters: selectedFilters });
  }

  toggleSidebar() {
    this.setState({
      height: '100vh',
      collapsed: !this.state.collapsed
    });
  }

  setHeight() {
    this.setState({ navbarHeight: this.navbar.current.clientHeight });
  }

  componentDidMount() {
    this.getLatestPhotos();
    this.setHeight();
    window.addEventListener('resize', debounce(this.setHeight, 500));
  }

  render() {
    return (
      <div id="page-content-wrapper" style={{ marginTop: this.state.navbarHeight, padding: 10 }}>
        <nav className="navbar fixed-top navbar-light bg-faded shadow-sm" ref={this.navbar}>
          <div className="nav-menu">
            <RoverForm
              handleSubmit={this.handleSubmit}
              cameras={this.state.cameras}
              toggleSidebar={this.toggleSidebar}
              togglerSize="mobile"
            />
            <Toggler togglerSize="desktop" toggleSidebar={this.toggleSidebar} />
          </div>
          <Sidebar
            height={this.state.height}
            collapsed={this.state.collapsed}
            filters={this.state.cameras}
            checkFilters={this.checkFilters}
            toggleSidebar={this.toggleSidebar}
          />
        </nav>
        <PhotoContainer
          photos={this.state.photos}
          loading={this.state.loading}
          selectedFilters={this.state.selectedFilters}
        />
      </div>
    );
  }
}
