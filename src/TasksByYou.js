import React, { Component } from 'react'
import IndividualTask from './IndividualTask'

class TasksByYou extends Component {
  
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
          <li key={this.props.id} className='task-list'>
            <span className='field task-name'><b>Task Name</b></span>
            <span className='field assign-to'><b>Assigned To</b></span>
            <span className='field due-date'><b>Due Date</b></span>
            <span className='field desc'><b>Description</b></span>
            <span className='button large material-icons'><i>menu</i></span>
          </li>
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

export default TasksByYou
