import axios from 'axios'
import React, { Component } from 'react'
import  TasksForYou from './TasksForYou'
import TasksByYou from './TasksByYou'

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
          this.setState({ taskList, taskList2 })
        }
      }
    )
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
        <button onClick={this.addNewTask.bind(this)} className='logout-button'>Add Task</button>
        <TasksForYou value={this.state.taskList} onChange={this.onChange.bind(this)} getDetails={this.getDetails.bind(this)}/>
        <TasksByYou value={this.state.taskList2 } onChange={this.onChange.bind(this)} getDetails={this.getDetails.bind(this)}/>
      </div>
    )
  }
}

export default TaskList
