import React, {Component} from 'react';

import AppHeader from './../app-header/app-header.js';
import SearchPanel from './../search-panel/search-panel.js';
import TodoList from './../todo-list/todo-list.js';
import ItemAdd from './../item-add-form/item-add-form.js'
import ItemStatusFilter from './../item-status-filter/item-status-filter.js';

export default class App extends Component {

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch'),
    ],

    term: '',
  };

  toggleProperty(arr, id, propName) {
      const idx = arr.findIndex((el) => el.id === id);

      const oldItem = arr[idx];
      const newItem = {...oldItem, [propName]: !oldItem[propName]};

      return [
        ...arr.slice(0, idx),
        newItem,
        ...arr.slice(idx + 1),
      ];
  }

  createTodoItem(label) {
    return { label, important: false, done: false, id: Math.random() }
  }

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {todoData: this.toggleProperty(todoData, id, 'important')}
    })
  }

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return {todoData: this.toggleProperty(todoData, id, 'done')}
    })
  }

  deleteItem = (id) => {
    this.setState(({todoData}) =>{
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1),
      ];

      return {
        todoData: newArray,
      }
    })
  }

  addItem = (text) => {
    this.setState(({todoData}) => {


      const copyState = todoData.slice(0, todoData.length + 1);

      copyState.push(
        this.createTodoItem(text),
      );

      console.log(copyState[copyState.length - 1].['id']);

      return {
        todoData: copyState,
      }
    })
  }

  search(items, term) {

    if (term == '') {
      return items
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
    })
  }
  
  onSearchChange = (term) => {
    this.setState(({term}));
  }


  render() {

    const {todoData, term} = this.state;

    const doneCount = todoData.filter((item) => item.done).length;
    const todoCount = todoData.filter((item) => !item.done).length;
    const visibleItems = this.search(todoData, term);

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel
          onSearchChange = {this.onSearchChange}/>
          <ItemStatusFilter />
        </div>

        <TodoList todos={visibleItems} 
        onDeleted={this.deleteItem}
        onToggleImportant = {this.onToggleImportant}
        onToggleDone = {this.onToggleDone}/>
        <ItemAdd 
        onClicked={this.addItem}/>
      </div>
    )
  }
};

