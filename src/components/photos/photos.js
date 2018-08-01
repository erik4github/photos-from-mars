import React from 'react';
import { Cards } from '../cards/cards';
import './photos.css';

export class Photos extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="photos">
                {this.props.photos.map((element, index) => {
                    return (
                        <Cards
                            key={element.img_src}
                            filters={this.props.filters}
                            src={element.img_src}
                            sol={element.sol}
                            earthDate={element.earth_date}
                            camera={element.camera.full_name}
                            cameraAbbreviation={element.camera.name}
                        />
                    );
                })}
            </div>
        );
    }
}
