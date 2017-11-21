import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'; // Route
import './App.css'

class RenderTask extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      showDetailsFlag: false,
      // editTaskFlag: false,
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

  showDetails() {
    console.log('showDetails -', this.props.currentTask._id)
    const state = this.state
    state.showDetailsFlag = state.showDetailsFlag ? false : true
    this.setState(state)
  }

  // editTask () {
  //   console.log('editTask')
  //   const state = this.state
  //   state.editTaskFlag = true
  //   this.setState(state)
  // }

  // onChange = (e) => {
  //   const state = this.state.currentTaskInfo
  //   state[e.target.name] = e.target.value
  //   this.setState(state)
  // }

  // onSubmit = (e) => {
  //   e.preventDefault()
  //   this.updateTask()
  //   this.props.onChange()
  //   const state = this.state
  //   state.editTaskFlag = false
  //   this.setState(state)
  //   this.props.onChange()
  //   // check validity
  // }

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
    const id = this.props.currentTask._id
    // console.log(id)
      if(!this.state.showDetailsFlag) {
        return (
          <li key={this.props.id} className='task-list'>
            <span className='field task-name' onClick={this.showDetails.bind(this)}>{this.state.currentTaskInfo.taskName}</span>
            {/* <span><button onClick={this.showDetails.bind(this)}>Show</button></span> */}
            <Link to={`/task/${id}`} id={id}>edit</Link>
            {/* <span><button onClick={this.editTask.bind(this)}>Update</button></span> */}
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
            {/* <span><button onClick={this.editTask.bind(this)}>Update</button></span> */}
            {/* <span><button onClick={this.showDetails.bind(this)}>Hide</button></span> */}
            <span><button onClick={this.deleteTask.bind(this)}>Delete</button></span>
          </li>
        )
      }
  }
}

export default RenderTask
