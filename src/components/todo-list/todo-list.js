import React from 'react';

import TodoListItem from '../todo-list-item/todo-list-item';

import './todo-list.css';

const TodoList = ({ items, onToggleDone, onDelete, onLabel }) => {
    const elements = items.map((item) => {
        const { id, ...itemProps } = item;
        return (
            <li key={id} className='list-group-item'>
                <TodoListItem
                    {...itemProps}
                    id={id}
                    onToggleDone={() => onToggleDone(id)}
                    onDelete={() => onDelete(id)}
                    onLabel={onLabel}
                />
            </li>
        );
    });

    return <ul className='todo-list list-group'>{elements}</ul>;
};

export default TodoList;
