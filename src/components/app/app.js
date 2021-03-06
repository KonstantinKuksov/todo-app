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
            this.createTodoItem('Learn React'),
            this.createTodoItem('Have a lunch')
        ],
        searchingText: '',
        filter: 'all'  //  all, active, done
    };

    createTodoItem(label) {
      return {
          label,
          important: false,
          done: false,
          id: this.maxId++
      }
    };

    setSearchingText = (text) => {
        this.setState({
            searchingText: text
        });
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

    onSearch = ( label ) => {
        if (!this.state.searchingText)
            return true;
        return label.toLowerCase().includes(this.state.searchingText.toLowerCase());
    };

    filter(items, filter) {

        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter( (item) => !item.done );
            case 'done':
                return items.filter( (item) => item.done );
            default:
                return items;
        }

    }

    onFilterChange = (filter) => {
        this.setState({ filter })
    };

    render() {

        const { todoData, filter } = this.state;
        const doneItems = todoData.filter( item => item.done ).length;
        const todoItems = todoData.length - doneItems;
        const visibleItems = this.filter( todoData, filter );

        return (
            <div className="todo-app">
                <AppHeader toDo={ todoItems } done={ doneItems }/>
                <div className="top-panel d-flex">
                    <SearchPanel setSearchingText={this.setSearchingText}
                                 searchingText={this.state.searchingText}/>
                    <ItemStatusFilter filter={ filter } onFilterChange={this.onFilterChange}/>
                </div>

                <TodoList todos={visibleItems}
                          onDeleted={(id) => {
                              this.deleteItem(id)
                          }}
                          onToggleDone={ this.onToggleDone }
                          onToggleImportant={ this.onToggleImportant }
                          onSearch={this.onSearch}/>
                          <ItemAddForm addItem={ this.addItem }/>
            </div>
        );
    }
}