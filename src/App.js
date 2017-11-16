import React, { Component } from 'react'
import './App.css'
import axios from 'axios'

class RenderTask extends Component {
  render () {
    return (
      <div>
        <li className='task-list'>
          <span className='field task-name'>{this.props.currentTask.taskName}</span>
          <span className='field assign-to'>{this.props.currentTask.assignTo}</span>
          <span className='field due-date'>{this.props.currentTask.dueDate}</span>
          <span className='field desc'>{this.props.currentTask.desc}</span>
        </li>
      </div>
    )
  }
}

class DisplayTasks extends Component {
  constructor(props) {
    super(props)

    this.state = {
      taskList: []
    }
  }

  componentDidMount () {
    axios.get(`http://localhost:3000/tasks`)
    .then(res => {
      if (res.data.status !== 'success') {
        // handle Error
      }
      const taskList = res.data.data.map(currentTask => {
        return currentTask
      })

      this.setState({
        taskList
      })
    })
  }

  render () {
    return (
      <div id='allTasks'>
        <h2>All tasks</h2>
        <ul>
        {
          this.state.taskList.map(current =>
            <RenderTask currentTask={current} />
          )
        }
        </ul>
      </div>
    )
  }
}

class CreateTask extends Component {
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

  onSubmit = (e) => {
    e.preventDefault()
    const { taskName, assignTo, dueDate, desc } = this.state
    console.log(taskName, assignTo, dueDate, desc)

    axios.post('http://localhost:3000/task', { taskName, assignTo, dueDate, desc })
    .then((res) => {
      // handle Result
      if(res.data.status === 'success') {
        // re-Render allTasks
      }
    });
  }

  render() {
    const { taskName, assignTo, dueDate, desc } = this.state
    return (
      <div>
        <h2>create task</h2>
        <form onSubmit={this.onSubmit}>
          <input type='text' name='taskName' value={taskName} onChange={this.onChange} placeholder='Name'/>
          <input type='text' name='assignTo' value={assignTo} onChange={this.onChange} placeholder='Assign to'/>
          <input type='text' name='dueDate' value={dueDate} onChange={this.onChange} placeholder='Due Date'/>
          <input type='textarea' name='desc' value={desc} onChange={this.onChange} placeholder='Description'/>
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
    <div>
      <DisplayTasks />
      <CreateTask />
    </div>
    )
  }
}

export default App
