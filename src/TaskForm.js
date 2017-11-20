import axios from 'axios'
import React, { Component } from 'react'

class TaskForm extends Component {
  
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
          console.log('Task added! - ', taskName)
          // re-Render allTasks
          this.props.onChange()
        }
        else {
          // handle error
          console.log('Error adding task!')
        }
      })
  }

  onSubmit = (e) => {
    console.log('Submitted')
    e.preventDefault()
    // check validity
    this.addTask()
  }
  
  render() {
    const { taskName, assignTo, dueDate, desc } = this.state
    return (
      <div>
        <h2>create task</h2>
        {/* <form onSubmit={this.onSubmit}> */}
          <input type='text' name='taskName' value={taskName} onChange={this.onChange} placeholder='Name' />
          <input type='text' name='assignTo' value={assignTo} onChange={this.onChange} placeholder='Assign to' />
          <input type='text' name='dueDate' value={dueDate} onChange={this.onChange} placeholder='Due Date' />
          <input type='textarea' name='desc' value={desc} onChange={this.onChange} placeholder='Description' />
          <button type='submit' onClick={this.onSubmit}>Submit</button>
        {/* </form> */}
      </div>
    )
  }
}

export default TaskForm
  