import React, { Component } from 'react';

import './item-add-form.css';

export default class ItemAddForm extends Component {
    state = {
        label: '',
    };

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value,
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onItemAdded(this.state.label);
        this.setState({
            label: '',
        });
    };

    render() {
        return (
            <form className='bottom-panel d-flex' onSubmit={this.onSubmit}>
                <input
                    type='text'
                    className='form-control new-todo-label'
                    value={this.state.label}
                    onChange={this.onLabelChange}
                    placeholder='What to do?'
                />

                <button type='submit' className='btn btn-outline-info'>
                    Add
                </button>
            </form>
        );
    }
}
