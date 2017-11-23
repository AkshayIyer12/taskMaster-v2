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
        <h2>assigned to you</h2>
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

class TasksTwo extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      taskList: []
    }
  }

  render() {
    return (
      <div id='allTasks'>
        <h2>assigned by you</h2>
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
      taskList: [],
      taskList2: []
    }
  }

  loadData() {
    axios.get(`http://localhost:3000/userTasks`)
      .then(res => {
        console.log('user tasks:', res.data)
        if (res.data.status !== 'success') {
          console.log('error getting tasks')
          // handle Error
        } else {
          
          const taskList = res.data.data.assignTo.map(currentTask => currentTask)
          const taskList2 = res.data.data.assignBy.map(currentTask => currentTask)

          this.setState({
            taskList, taskList2
          })
          // console.log('1', this.state.taskList)
          // console.log('2', taskList2)
          // console.log('2', this.state.taskList2)
        }
      })
  }

  componentDidMount() {
    console.log('component mounted tasklist')
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
        <TasksTwo value={this.state.taskList2 } onChange={this.onChange.bind(this)} getDetails={this.getDetails.bind(this)}/>
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
