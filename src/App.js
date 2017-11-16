import React, {
  Component
} from 'react'
import './App.css'
import axios from 'axios'

class RenderTask extends Component {
  render () {
    return (
      <li>
      {this.props.value.taskName} - {this.props.value.dueDate} - {this.props.value.assignTo} - {this.props.value.desc}
      </li>
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
        {this.state.taskList.map(current =>
          <RenderTask value={current} />
        )}
        </ul>
      </div>
    )
  }
}

class CreateTask extends Component {
  constructor(props) {
    super(props)

this.state = {
			taskName: '',
			assignTo: '',
			dueDate: '',
			desc:''
		}
  }

  render() {
    return (
      <div id='createTask'>
        <h2>createTask</h2>
            <div>
              <input 
              type="text"
              name="taskName"
              placeholder="Name"
              value={ this.state.taskName }
              onChange={ this.handleChange } 
              />
              
              <input
              type="text"
              name="assignTo"
              placeholder="Assign To"
              value={ this.state.assignTo }
              onChange={ this.handleChange }
              />

              <input
              type="text"
              name="dueDate"
              placeholder="Due Date"
              value={ this.state.dueDate }
              onChange={ this.handleChange }
              />

              <input
              type="text"
              name="desc"
              placeholder="Description"
              value={ this.state.desc }
              onChange={ this.handleChange }
              />
            
              <button value="Send" onClick={ this.addTask }>Add</button>
        </div>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
    <div>
      <DisplayTasks />
    </div>
    )
  }
}

export default App
