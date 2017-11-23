import React, { Component } from 'react'
import axios from 'axios'

class NewTask extends Component {

  constructor() {
    super()
    this.state = {
      userList: [],
      taskName: '',
      assignTo: '',
      dueDate: this.getDate(),
      desc: ''
    }
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  getDate() {
    const today = new Date()
    const day = today.getDate(),
      month = today.getMonth() + 1,
      year = today.getFullYear()
    return (year + '-' + month + '-' + day)
  }
  
  getUserList () {
    axios.get('http://localhost:3000/users')
    .then((res) => {
      if(res.data.status !== 'success') {
        // handle error
      } else {
        const userList = res.data.data.map(currentUser => currentUser.userName)
        const state = this.state
        state.userList = userList
        this.setState(state)
        console.log('users:', this.state.userList)
      }
    })
  }

  addTask () {
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
    console.log('assignto', this.state.assignTo)
    e.preventDefault()
    console.log('Submitted')
    this.addTask()
  }

  onCancel () {
    console.log(this.props.history)
    this.props.history.push('/taskListAndForm')
  }

  componentDidMount () {
    this.getUserList()
  }

  render () {
    this.getUserList.bind(this)

    this.getDate()
    const { taskName, dueDate, desc } = this.state    
    return (
      <div className='edit-form'>
        <h2>New task</h2>
        <label>Name:<input type='text' name='taskName' value={taskName} onChange={this.onChange} /></label>
        <label>Assign To:<select name='assignTo' value={this.state.assignTo} onChange={this.onChange} selected=''>
          <option value='placeholder'></option>
            {this.state.userList.map(currentUser => 
              <option value={currentUser}>{currentUser}</option>
            )}
          </select>
        </label>
        <label>Due Date:<input type='date' name='dueDate' value={dueDate} onChange={this.onChange} /></label>
        <label>Description:<input type='textarea' name='desc' value={desc} onChange={this.onChange} /></label>
        <button onClick={this.onSubmit.bind(this)}>Submit</button>
        <button onClick={this.onCancel.bind(this)}>Cancel</button>
      </div>
    )
  }
}

export default NewTask
