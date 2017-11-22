import axios from 'axios'
import React, { Component } from 'react'

class NewTaskForm extends Component {
  
  constructor() {
    super()
    this.state = {
      showForm: false,
      taskName: '',
      assignTo: '',
      dueDate: '',
      desc: ''
    }
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }
  
  addTask() {
    const { taskName, assignTo, dueDate, desc } = this.state
    axios.post('http://localhost:3000/task', { taskName, assignTo, dueDate, desc })
      .then((res) => {
        // handle result
        if (res.data.status === 'success') {
          console.log('Task added to DB - ', taskName)
          // re-Render allTasks
          this.props.onChange()

          const state = this.state
          state.showForm = false
          this.setState(state)
        }
        else {
          // handle error
          console.log('Error adding task!')
        }
      })
  }

  onSubmit = (e) => {
    console.log('Submitted')
    if((this.state.taskName === '') || (this.state.assignTo === '')
      || (this.state.dueDate === '') || (this.state.desc === '')) {
      console.log('empty fields!')
      
    }
    e.preventDefault()
    // check validity
    this.addTask()
  }
  
  showForm () {
    console.log('show form')
    const state = this.state
    state.showForm = true
    this.setState(state)
  }

  onCancel = (e) => {
    console.log('Cancelled')
    const state = this.state
    state.showForm = false
    this.setState(state)
  }

  render() {
    const { taskName, assignTo, dueDate, desc } = this.state
    if(this.state.showForm) {
      return (
        <div className='edit-form'>
            <h2>Add task</h2>
            <label>Name:<input type='text' name='taskName' value={taskName} onChange={this.onChange} /></label>
            <label>Assign to:<input type='text' name='assignTo' value={assignTo} onChange={this.onChange} /></label>
            <label>Due Date:<input type='text' name='dueDate' value={dueDate} onChange={this.onChange} /></label>
            <label>Description:<input type='textarea' name='desc' value={desc} onChange={this.onChange} /></label>
            <button onClick={this.onSubmit}>Submit</button>
            <button onClick={this.onCancel}>Cancel</button>
        </div>
      )
    } else {
      return (
        <div className='edit-form'>
          <h2>Add task</h2>
          <button onClick={this.showForm.bind(this)}>+</button>
        </div>
      )
    }
  }
}

export default NewTaskForm
  