import React, {Component} from 'react';
import './item-add-form.css';

export default class ItemAdd extends Component {

  state = {
    label: '',
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.onClicked(this.state.label);
    this.setState({
      label: ''
    })
  }

  render() {

    return (
      <form className = 'item-add-form d-flex' onSubmit = {this.onSubmit}>
      <input type='text'
             className = 'form-control'
             onChange = {this.onLabelChange}
             placeholder = 'What need to do?'
             value = {this.state.label}/>
        <button className = 'button-add'
        >Add DO!</button>
        </form>
    )
  }
}