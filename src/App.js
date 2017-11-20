import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import TaskForm from './TaskForm'
import RenderTask from './RenderTask'

class Tasks extends Component {

  constructor(props) {
    super(props)
    this.state = {
      taskList: []
    }
  }

  render() {
    return (
      <div id='allTasks'>
        <h2>All tasks</h2>
        <ul>
          {
            this.props.value.map(current =>
              <RenderTask key={current._id} currentTask={current} onChange={this.props.onChange} />
            )
          }
        </ul>
      </div>
    )
  }
}

class TaskListAndForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      taskList: []
    }
  }

  loadData() {
    axios.get(`http://localhost:3000/tasks`)
      .then(res => {
        if (res.data.status !== 'success') {
          // handle Error
        } else {
          const taskList = res.data.data.map(currentTask => {
            return currentTask
          })

          this.setState({
            taskList
          })
        }
      })
  }

  componentDidMount() {
    this.loadData()
  }

  onChange() {
    console.log('onChange')
    this.loadData()
  }

  onDelete() {
    console.log('onDelete')
    this.loadData()
  }

  render() {
    return (
      <div>
        <TaskForm onChange={this.onChange.bind(this)} />
        <Tasks value={this.state.taskList} onChange={this.onDelete.bind(this)} />
      </div>
    )
  }
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <TaskListAndForm />
    )
  }
}

export default App
