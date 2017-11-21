import axios from 'axios'
import React, { Component } from 'react'
import './App.css'

class RenderTask extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      showDetailsFlag: false,
      editTaskFlag: false,
      currentTaskInfo: {
        taskName: this.props.currentTask.taskName,
        assignTo: this.props.currentTask.assignTo,
        dueDate: this.props.currentTask.dueDate,
        desc: this.props.currentTask.desc
      }
    }
  }

  deleteTask() {
    console.log('Delete current task')
    const { _id } = this.props.currentTask
    axios.delete(`http://localhost:3000/task/${this.props.currentTask._id}`, { _id })
    .then((res) => {
      // handle result
      if (res.data.status === 'success') {
        console.log('Task deleted!')
        // re-Render allTasks
        this.props.onChange()
      }
      else {
        // handle error
        console.log('Error deleting task!')
      }
    })
  }

  showDetails() {
    console.log('showDetails')
    const state = this.state
    state.showDetailsFlag = state.showDetailsFlag ? false : true
    this.setState(state)
  }

  editTask () {
    console.log('editTask')
    const state = this.state
    state.editTaskFlag = true
    this.setState(state)
  }

  onChange = (e) => {
    const state = this.state.currentTaskInfo
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.updateTask()
    this.props.onChange()
    const state = this.state
    state.editTaskFlag = false
    this.setState(state)
    this.props.onChange()
    // check validity
  }

  updateTask () {
    console.log('updating current task')
    const tempObj = this.state.currentTaskInfo
    axios.put(`http://localhost:3000/task/${this.props.currentTask._id}`, tempObj)
    .then((res) => {
      if(res.data.status !== 'success') {
        // handle error
      } else {
        this.props.onChange()
      }
    })
  }

  render() {
    if(!this.state.editTaskFlag) {
      if(!this.state.showDetailsFlag) {
        return (
          <li key={this.props.id} className='task-list'>
            <span className='field task-name' onClick={this.showDetails.bind(this)}>{this.state.currentTaskInfo.taskName}</span>
            {/* <span><button onClick={this.showDetails.bind(this)}>Show</button></span> */}
            <span><button onClick={this.editTask.bind(this)}>Update</button></span>
            <span><button onClick={this.deleteTask.bind(this)}>Delete</button></span>
          </li>
        )
      } else {
        return (
          <li key={this.props.id} className='task-list'>
            <span className='field task-name' onClick={this.showDetails.bind(this)}>{this.state.currentTaskInfo.taskName}</span>
            <span className='field assign-to'>{this.props.currentTask.assignTo}</span>
            <span className='field due-date'>{this.props.currentTask.dueDate}</span>
            <span className='field desc'>{this.props.currentTask.desc}</span>
            <span><button onClick={this.editTask.bind(this)}>Update</button></span>
            {/* <span><button onClick={this.showDetails.bind(this)}>Hide</button></span> */}
            <span><button onClick={this.deleteTask.bind(this)}>Delete</button></span>
          </li>
        )
      }
    } else {
      const { taskName, assignTo, dueDate, desc } = this.state.currentTaskInfo
      return (
        <div>
          <input type='text' name='taskName' value={taskName} onChange={this.onChange} placeholder='Name' />
          <input type='text' name='assignTo' value={assignTo} onChange={this.onChange} placeholder='Assign to' />
          <input type='text' name='dueDate' value={dueDate} onChange={this.onChange} placeholder='Due Date' />
          <input type='textarea' name='desc' value={desc} onChange={this.onChange} placeholder='Description' />
          <button type='submit' onClick={this.onSubmit.bind(this)}>Update</button>
        </div>
      )
    }
  }
}

export default RenderTask
