import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'; // Route
import './App.css'

class RenderTask extends Component {
  
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

  showDetails () {
    console.log('show details')

  }
  
  clickTask () {
    console.log('clicked on task', this.props.currentTask._id)
    // this.props.history.push('/red')
    console.log(this)
  }
  render() {
    const id = this.props.currentTask._id
        return (
          <li key={this.props.id} className='task-list' onClick={this.clickTask.bind(this)}>
            <span className='field task-name' onClick={this.showDetails.bind(this)}>{this.state.currentTaskInfo.taskName}</span>
            <span className='field assign-to'>{this.props.currentTask.assignTo}</span>
            <span className='field du2e-date'>{this.props.currentTask.dueDate}</span>
            <span className='field desc'>{this.props.currentTask.desc}</span>
            {/* <Link to={`/task/${id}`} id={id}>edit</Link> */}
            <LinkMe to={`/task/${id}`} id={id} />
            <span><button onClick={this.deleteTask.bind(this)}>Delete</button></span>
          </li>
        )
  }
}

class LinkMe extends Component {
  render () {
    return (
    <button>
      <Link to={this.props.to} id={this.props.id}>Details</Link>
    </button>
    )
  }
}
export default RenderTask
