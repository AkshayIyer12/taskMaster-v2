import React, { Component } from 'react'
import axios from 'axios'

class NewTask extends Component {

  constructor() {
    super()
    this.state = {
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
          this.props.history.push('/taskListAndForm')
        }
        else {
          // handle error
          console.log('Error adding task!')
        }
      })
  }

  onSubmit = (e) => {
    e.preventDefault()
    console.log('Submitted')
    if((this.state.taskName === '') && (this.state.assignTo === '')
      && (this.state.dueDate === '') && (this.state.desc === '')) {
      console.log('empty fields!')
    }
    // check validity
    this.addTask()
  }

  onCancel () {
    console.log(this.props.history)
    this.props.history.push('/taskListAndForm')
  }

  render () {
    const { taskName, assignTo, dueDate, desc } = this.state    
    return (
      <div className='edit-form'>
        <h2>New task</h2>
        <label>Name:<input type='text' name='taskName' value={taskName} onChange={this.onChange} /></label>
        <label>Assign to:<input type='text' name='assignTo' value={assignTo} onChange={this.onChange} /></label>
        <label>Due Date:<input type='text' name='dueDate' value={dueDate} onChange={this.onChange} /></label>
        <label>Description:<input type='textarea' name='desc' value={desc} onChange={this.onChange} /></label>
        <button onClick={this.onSubmit}>Submit</button>
        <button onClick={this.onCancel.bind(this)}>Cancel</button>
      </div>
    )
  }
}

export default NewTask
