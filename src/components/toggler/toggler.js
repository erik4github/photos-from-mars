import React from 'react';

export class Toggler extends React.Component {
    render() {
        return (
            <button type="button"
                className={this.props.togglerSize === 'mobile' ? 'navbar-toggler d-sm-none' : 'navbar-toggler d-none d-sm-block'}
                role="button"
                onClick={this.props.toggleSidebar}>
                <span className="navbar-toggler-icon"></span>
            </button>
        );
    }
}
