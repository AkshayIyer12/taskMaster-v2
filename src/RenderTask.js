import axios from 'axios'
import React, { Component } from 'react'
import './App.css'

class RenderTask extends Component {
  
    constructor(props) {
      super(props)
      this.state = {
        // currentTaskInfo: this.props.currentTask,
        showDetailsFlag: false,
        editTaskFlag: false,
        taskName: this.props.currentTask.taskName,
        assignTo: this.props.currentTask.assignTo,
        dueDate: this.props.currentTask.dueDate,
        desc: this.props.currentTask.desc
      }
    }
  
    deleteTask() {
      console.log('d e l e t t h i s')
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
      // console.log(this.state.showDetailsFlag)
      const state = this.state
      state.showDetailsFlag = state.showDetailsFlag ? false : true
      this.setState(state)
      // console.log(this.state.showDetailsFlag)    
    }
  
    editTask () {
      console.log('editTask')
      const state = this.state
      state.editTaskFlag = true
      this.setState(state)
      console.log(this.state.taskName)
    }
  
    onChange = (e) => {
      const state = this.state
      state[e.target.name] = e.target.value
      this.setState(state)
    }
  
    onSubmit = (e) => {
      e.preventDefault()
      console.log('Updating now')
  
      const state = this.state
      state.editTaskFlag = false
      this.setState(state)
  
      // check validity
      this.updateTask()
      // this.props.onChange()
    }
  
    updateTask () {
      console.log('updating')
      const { taskName, assignTo, dueDate, desc } = this.props.currentTask
      axios.put(`http://localhost:3000/task/${this.props.currentTask._id}`, { taskName, assignTo, dueDate, desc })
      .then((res) => {
        console.log(res)
      })
    }
  
    render() {
      console.log(this.props.currentTask._id)
      if(!this.state.editTaskFlag) {
        if(!this.state.showDetailsFlag) {
          return (
            <li key={this.props.id} className='task-list'>
              <span className='field task-name' onClick={this.showDetails.bind(this)}>{this.props.currentTask.taskName}</span>
              {/* <span><button onClick={this.showDetails.bind(this)}>Show</button></span> */}
              <span><button onClick={this.editTask.bind(this)}>Update</button></span>
              <span><button onClick={this.deleteTask.bind(this)}>Delete</button></span>
            </li>
          )
        } else {
          return (
            <li key={this.props.id} className='task-list'>
              <span className='field task-name' onClick={this.showDetails.bind(this)}>{this.props.currentTask.taskName}</span>
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
        console.log('form rendered')
        const { taskName, assignTo, dueDate, desc } = this.state
        return (
          <div>
            {/* <form onSubmit={this.onSubmit}> */}
            <input type='text' name='taskName' value={taskName} onChange={this.onChange} placeholder='Name' />
            <input type='text' name='assignTo' value={assignTo} onChange={this.onChange} placeholder='Assign to' />
            <input type='text' name='dueDate' value={dueDate} onChange={this.onChange} placeholder='Due Date' />
            <input type='textarea' name='desc' value={desc} onChange={this.onChange} placeholder='Description' />
            <button type='submit' onClick={this.onSubmit}>Update</button>
            {/* </form> */}
          </div>
        )
  
        // return (
        //   <h1>hello</h1>
        // )
      }
    }
  }

export default RenderTask
