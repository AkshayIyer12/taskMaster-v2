import React, {
  Component
} from 'react'
import './App.css'
import axios from 'axios'

class DisplayTasks extends Component {
  constructor(props) {
    super(props)

    this.state = {
      names: []
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/tasks`)
      .then(res => {
        if (res.data.status !== 'success') {
          // handle Error
        }
        const names = res.data.data.map(currentTask => {
          return currentTask
        })
        this.setState({
          names
        })
      })
  }

  render() {
    return (
      <div id='allTasks'>
        <h2>All tasks</h2>
        <ul>
        {this.state.names.map(current =>
          <li>{current.taskName} - {current.assignTo} - {current.dueDate} - {current.desc}</li> // key
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
        <h1>createTask</h1>
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
      <CreateTask />
    </div>
    )
  }
}

export default App
