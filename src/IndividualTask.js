import axios from 'axios'
import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import './App.css'

class IndividualTask extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      currentTaskInfo: {
        id: this.props.id,
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
  
  clickTask () {
    console.log('clicked on task', this.props.currentTask._id)
    this.props.getDetails(this.props.currentTask._id)
  }

  render() {
    return (
      <li key={this.props.id} className='task-list'>
        <span className='field task-name' onClick={this.clickTask.bind(this)}>{this.state.currentTaskInfo.taskName}</span>
        <span className='field assign-to' onClick={this.clickTask.bind(this)}>{this.props.currentTask.assignTo}</span>
        <span className='field du2e-date' onClick={this.clickTask.bind(this)}>{this.props.currentTask.dueDate}</span>
        <span className='field desc' onClick={this.clickTask.bind(this)}>{this.props.currentTask.desc}</span>
        <span><button onClick={this.deleteTask.bind(this)}>Delete</button></span>
      </li>
    )
  }
}

export default IndividualTask
