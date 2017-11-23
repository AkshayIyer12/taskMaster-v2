import axios from 'axios'
import React, { Component } from 'react'
import IndividualTask from './IndividualTask'
import { Link } from 'react-router-dom'

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
              <IndividualTask key={current._id} currentTask={current}
                onChange={this.props.onChange} getDetails={this.props.getDetails} />
            )
          }
        </ul>
      </div>
    )
  }
}

class TasksAssignedTo extends Component {
  
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
              <IndividualTask key={current._id} currentTask={current}
                onChange={this.props.onChange} getDetails={this.props.getDetails} />
            )
          }
        </ul>
      </div>
    )
  }
}

class TaskList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      taskList: []
    }
  }

  loadData() {
    axios.get(`http://localhost:3000/userTasks`)
      .then(res => {
        console.log('user tasks:', res.data)
        if (res.data.status !== 'success') {
          // console.log(res.data.data)
          // handle Error
        } else {
          
          const taskList = res.data.data.assignTo.map(currentTask => {
            return currentTask
          })

          this.setState({
            taskList
          })
        }
      })
  }

  componentDidMount() {
    console.log('component mounted tasklist')
    // console.log('id in tasklist', this.props)
    this.loadData()
  }

  onChange() {
    console.log('onChange in tasklist')
    this.loadData()
  }

  getDetails (id) {
    this.props.history.push(`/task/${id}`)
  }

  render() {
    
    return (
      <div>
        <AddTaskLink />
        <Tasks value={this.state.taskList} onChange={this.onChange.bind(this)} getDetails={this.getDetails.bind(this)}/>
        <TasksAssignedTo value={this.state.taskList} onChange={this.onChange.bind(this)} getDetails={this.getDetails.bind(this)}/>
      </div>
    )
  }
}

class AddTaskLink extends Component {
  render () {
    return (
      <Link to='/newtask'>Add Task</Link>
    )
  }
}

export default TaskList
