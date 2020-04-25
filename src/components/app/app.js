import React, { Component } from "react";
import ItemAddForm from "../item-add-form";
import AppHeader from "./../app-header";
import ItemStatusFilter from "./../item-status-filter";
import SearchPanel from "./../search-panel";
import TodoList from "./../todo-list";
import './app.css';

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            { label: 'Drink Coffee', important: false, id: 1, done: false },
            { label: 'Make Awesome App', important: false, id: 2, done: false },
            { label: 'Have a lunch', important: false, id: 3, done: false }
        ]
    };

    countDoneItems = () => {
        const doneItems = this.state.todoData.filter( item => item.done );
        return doneItems.length;
    };

    countTodoItems = () => {
        return this.state.todoData.length - this.countDoneItems();
    };

    deleteItem = (id) => {
        this.setState( ( { todoData } ) => {
            const newArray = todoData.filter( listItem => listItem.id !== id );
            return {
                todoData: newArray
            }
        } );
    };

    addItem = (text) => {
        const newItem = {
            label: text,
            important: false,
            id: this.maxId++
        };

        this.setState( ({ todoData }) => {
            return {
                todoData: [...todoData, newItem]
            };
        });
    };

    onToggleImportant = (id) => {
        this.setState( ({todoData}) => {
            const newArray = todoData.map(
                (item) => {
                    if (item.id === id) {
                        item.important = !item.important;
                    }
                    return item;
                }
            );
            return {
                todoData: newArray
            }
        });
    };

    onToggleDone = (id) => {
        this.setState( ({todoData}) => {
            const newArray = todoData.map(
                (item) => {
                    if (item.id === id) {
                        item.done = !item.done;
                    }
                    return item;
                }
            );
            return {
                todoData: newArray
            }
        });
    };

    render() {

        return (
            <div className="todo-app">
                <AppHeader toDo={ this.countTodoItems() } done={ this.countDoneItems() }/>
                <div className="top-panel d-flex">
                    <SearchPanel/>
                    <ItemStatusFilter/>
                </div>

                <TodoList todos={this.state.todoData}
                          onDeleted={(id) => {
                              this.deleteItem(id)
                          }}
                          onToggleDone={ this.onToggleDone }
                          onToggleImportant={ this.onToggleImportant }/>
                          <ItemAddForm addItem={ this.addItem }/>
            </div>
        );
    }
}