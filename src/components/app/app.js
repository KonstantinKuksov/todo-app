import React, { Component } from "react";
import ItemAddForm from "../item-add-form";
import AppHeader from "./../app-header";
import ItemStatusFilter from "./../item-status-filter";
import SearchPanel from "./../search-panel";
import TodoList from "./../todo-list";
import './app.css';

export default class App extends Component {

    maxId = 1;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')
        ]
    };

    createTodoItem(label) {
      return {
          label,
          important: false,
          done: false,
          id: this.maxId++
      }
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
        const newItem = this.createTodoItem(text);

        this.setState( ({ todoData }) => {
            return {
                todoData: [...todoData, newItem]
            };
        });
    };

    toggleProperty(arr, id, propName) {
        return arr.map( (item) => {
                if (item.id === id) {
                    item[propName] = !item[propName];
                }
                return item;
            }
        );
    };

    onToggleImportant = (id) => {
        this.setState( ({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        });
    };

    onToggleDone = (id) => {
        this.setState( ({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        });
    };

    render() {

        const { todoData } = this.state;
        const doneItems = todoData.filter( item => item.done ).length;
        const todoItems = todoData.length - doneItems;

        return (
            <div className="todo-app">
                <AppHeader toDo={ todoItems } done={ doneItems }/>
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