import React, { Component } from 'react'
import axios from 'axios'

class TaskDetails extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      editModeFlag: false,
      userList: [],
      currentTaskInfo: {
        taskName: '',
        assignTo: '',
        dueDate: '',
        desc: ''
      }
    }
  }

  onChange = (e) => {
    const state = this.state.currentTaskInfo
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.updateTask()
    const state = this.state
    state.editTaskFlag = false
    this.setState(state)
    // check validity
  }

  updateTask () {
    console.log('updating current task')
    const tempObj = this.state.currentTaskInfo
    const { taskName, assignTo, dueDate, desc } = this.state.currentTaskInfo
    console.log('tempobj', tempObj)
    axios.put(`http://localhost:3000${this.props.location.pathname}`, { taskName, assignTo, dueDate, desc })
    .then((res) => {
      if(res.data.status !== 'success') {
        // handle error
        console.log('fail')
      } else {
        console.log('success')
        const state = this.state
        state.editModeFlag = false
        this.setState(state)
      }
    })
  }

  getUserList () {
    console.log('getusers')
    axios.get('http://localhost:3000/users')
    .then((res) => {
      if(res.data.status !== 'success') {
        // handle error
      } else {
        const userList = res.data.data.map(currentUser => currentUser.userName)
        const state = this.state
        state.userList = userList
        this.setState(state)
      }
    })
  }

  getTaskDetails() {
    axios.get(`http://localhost:3000${this.props.location.pathname}`)
    .then((res) => {
      if(res.data.status === 'success'){
        // console.log('res is', res.data.data)
        const state = this.state
        Object.assign(state.currentTaskInfo, res.data.data)
        this.setState(state)
      } else {
        // handle error
      }
    })
  }

  componentDidMount(){
    this.getTaskDetails()
    this.getUserList()
  }

  editMode () {
    console.log('edit mode toggled')
    const state = this.state
    state.editModeFlag = true
    this.setState(state)
  }

  onCancel () {
    const state = this.state
    state.editModeFlag = false
    this.setState(state)
  }

  goBack () {
    this.props.history.push('/taskList')
  }

  render () {
    if(!this.state.editModeFlag) {    
      return (
        <div className='details'>
          <h1>current task</h1>
          <div>Name: {this.state.currentTaskInfo.taskName}</div>
          <div>Assign To: {this.state.currentTaskInfo.assignTo}</div>
          <div>Due Date: {this.state.currentTaskInfo.dueDate}</div>
          <div>Description: {this.state.currentTaskInfo.desc}</div>
          <div>
            <button onClick={this.editMode.bind(this)}>Edit</button>
            <button onClick={this.goBack.bind(this)}>Back</button>
          </div>
        </div>
      )
    } else {
      const { taskName, dueDate, desc } = this.state.currentTaskInfo
      return (
        <div className='edit-form'>
          <h1>Edit task</h1>
          <label>Name: <input type='text' name='taskName' value={taskName} onChange={this.onChange} placeholder='Name' /></label><br/>
          <label>Assign To:<select name='assignTo' value={this.state.assignTo} onChange={this.onChange} selected={this.state.currentTaskInfo.assignTo}>
          <option value='placeholder'></option>
            {this.state.userList.map(currentUser => 
              <option key={currentUser} value={currentUser}>{currentUser}</option>
            )}
            </select>
          </label>
          <label>Due Date:<input type='date' name='dueDate' value={dueDate} onChange={this.onChange} /></label>
          <label>Description: <input type='textarea' name='desc' value={desc} onChange={this.onChange} placeholder='Description' /></label><br/>
          <button onClick={this.onSubmit.bind(this)}>Update</button>
          <button onClick={this.onCancel.bind(this)}>Cancel</button>
        </div>
      )
    }
  }
}

export default TaskDetails
