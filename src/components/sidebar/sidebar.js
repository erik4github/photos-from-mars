import React from 'react';
import { Filter } from '../filter/filter';
import './sidebar.css';

export class Sidebar extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return (
            <div className={this.props.collapsed ? 'sidebar' : 'sidebar open shadow-lg'} style={{ height: this.props.height }}>
                <button type="button" className="close" onClick={this.props.toggleSidebar}>
                    <span>&times;</span>
                </button>
                <span>Camera Filters</span>
                <Filter
                    filters={this.props.filters}
                    checkFilters={this.props.checkFilters} />
            </div>
        );
    }
}