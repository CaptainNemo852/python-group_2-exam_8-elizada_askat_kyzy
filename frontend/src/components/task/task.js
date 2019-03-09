import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class Task extends Component {
    render() {
        const link = "/task/" + this.props.tasks.id;
        return (
            <div className="card" onClick={this.props.clicked}>
                <div className="card-body">
                    <h5 className="card-title">{this.props.tasks.summary}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{this.props.tasks.status}</h6>
                    <p className="card-text">{this.props.tasks.description}</p>
                    <NavLink className="nav-link" to={link}>Learn more...</NavLink>
                </div>
            </div>
        )
    }
}

export default Task;