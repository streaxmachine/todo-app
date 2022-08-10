import React, { Component } from 'react';

import AppHeader from '../app-header';
import TodoList from '../todo-list';

import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {
    maxId = 100;

    state = {
        items: [],
        filter: 'all',
    };

    onItemAdded = (label) => {
        if (label.trim().length !== 0) {
            this.setState((state) => {
                const item = this.createItem(label);
                return { items: [...state.items, item] };
            });
        }
    };

    toggleProperty = (arr, id, propName) => {
        const idx = arr.findIndex((item) => item.id === id);
        const oldItem = arr[idx];
        const value = !oldItem[propName];

        const item = { ...arr[idx], [propName]: value };
        return [...arr.slice(0, idx), item, ...arr.slice(idx + 1)];
    };

    onToggleDone = (id) => {
        this.setState((state) => {
            const items = this.toggleProperty(state.items, id, 'done');
            return { items };
        });
    };

    onDelete = (id) => {
        this.setState((state) => {
            const idx = state.items.findIndex((item) => item.id === id);
            const items = [
                ...state.items.slice(0, idx),
                ...state.items.slice(idx + 1),
            ];
            return { items };
        });
    };

    onFilterChange = (filter) => {
        this.setState({ filter });
    };

    onLabel = (label, id, important, done) => {
        this.setState((state) => {
            const idx = state.items.findIndex((item) => item.id === id);
            const item = this.createItem(label, id, important, done);
            const items = [
                ...state.items.slice(0, idx),
                item,
                ...state.items.slice(idx + 1),
            ];
            return { items };
        });
    };

    createItem(label, id = ++this.maxId, important = false, done = false) {
        return {
            id: id,
            label,
            important: important,
            done: done,
        };
    }

    filterItems(items, filter) {
        if (filter === 'all') {
            return items;
        } else if (filter === 'active') {
            return items.filter((item) => !item.done);
        } else if (filter === 'done') {
            return items.filter((item) => item.done);
        }
    }

    render() {
        const { items, filter } = this.state;
        const doneCount = items.filter((item) => item.done).length;
        const toDoCount = items.length - doneCount;
        const visibleItems = this.filterItems(items, filter);

        return (
            <div className='todo-app'>
                <AppHeader toDo={toDoCount} done={doneCount} />

                <div className='search-panel d-flex'>
                    <ItemStatusFilter
                        filter={filter}
                        onFilterChange={this.onFilterChange}
                    />
                </div>

                <TodoList
                    items={visibleItems}
                    onToggleDone={this.onToggleDone}
                    onDelete={this.onDelete}
                    onLabel={this.onLabel}
                />

                <ItemAddForm onItemAdded={this.onItemAdded} />
            </div>
        );
    }
}
