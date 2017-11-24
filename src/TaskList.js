import axios from 'axios'
import React, { Component } from 'react'
import IndividualTask from './IndividualTask'

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
        if (res.data.status !== 'success') {
          console.log('error getting tasks')
          // handle Error
        } else {
          
          const taskList = res.data.data.assignTo.map(currentTask => currentTask)
          const taskList2 = res.data.data.assignBy.map(currentTask => currentTask)

          this.setState({
            taskList, taskList2
          })
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

  addNewTask() {
    console.log('add new task')
    console.log(this.props.history.push('/newtask'))
  }

  render() {
    return (
      <div>
        <button onClick={this.addNewTask.bind(this)}>Add Task</button>
        {/* <button className="waves-effect waves-light btn-large" onClick={this.addNewTask.bind(this)}>Add Task</button> */}
        <Tasks value={this.state.taskList} onChange={this.onChange.bind(this)} getDetails={this.getDetails.bind(this)}/>
        <TasksTwo value={this.state.taskList2 } onChange={this.onChange.bind(this)} getDetails={this.getDetails.bind(this)}/>
      </div>
    )
  }
}

export default TaskList
