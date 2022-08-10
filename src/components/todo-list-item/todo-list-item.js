import React from 'react';

import './todo-list-item.css';

class TodoListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            label: this.props.label,
            editing: false,
        };
    }

    onValue = (e) => {
        this.setState({
            label: e.target.value,
        });
    };

    onEdit = () => {
        this.setState({
            editing: true,
        });
    };

    onCancel = (e) => {
        e.preventDefault();
        this.setState((state) => ({
            editing: false,
            label: this.props.label,
        }));
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onLabel(
            this.state.label,
            this.props.id,
            this.props.important,
            this.props.done
        );
        this.setState((state) => ({
            editing: false,
        }));
    };

    buttonsRender = () => {
        if (!this.state.editing) {
            return (
                <span className='btn-span'>
                    <button
                        type='button'
                        className='btn btn-outline-success btn-sm float-right'
                        onClick={this.props.onToggleDone}
                    >
                        <i className='fa fa-check' />
                    </button>

                    <button
                        type='button'
                        className='btn btn-outline-danger btn-sm float-right'
                        onClick={this.props.onDelete}
                    >
                        <i className='fa fa-trash-o' />
                    </button>

                    <button
                        type='button'
                        className='btn btn-sm float-right'
                        onClick={this.onEdit}
                    >
                        <i className='fa fa-pencil' aria-hidden='true' />
                    </button>
                </span>
            );
        } else {
            return (
                <span>
                    <button
                        className='btn btn-outline-success btn-sm float-right'
                        type='submit'
                    >
                        <i className='fa fa-check-square-o' />
                    </button>
                    <button
                        className='btn btn-sm float-right'
                        onClick={this.onCancel}
                    >
                        <i className='fa fa-ban' aria-hidden='true' />
                    </button>
                </span>
            );
        }
    };

    render() {
        const { important, done } = this.props;

        let classNames = 'todo-list-item';
        if (important) {
            classNames += ' important';
        }

        if (done) {
            classNames += ' done';
        }

        if (!this.state.editing) {
            return (
                <span className={classNames}>
                    <span className='todo-list-item-label'>
                        {this.state.label}
                    </span>
                    {this.buttonsRender()}
                </span>
            );
        }

        return (
            <form className={classNames} onSubmit={this.onSubmit}>
                <input
                    className='todo-list-item-label'
                    value={this.state.label}
                    onChange={this.onValue}
                />
                {this.buttonsRender()}
                {/* 
                <button onClick={this.refTest}>test</button> */}
            </form>
        );
    }
}

export default TodoListItem;
