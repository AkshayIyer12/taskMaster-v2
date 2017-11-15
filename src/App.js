import React, {
  Component
} from 'react'
import './App.css'
import axios from 'axios'

<<<<<<< HEAD
class App extends Component {
  constructor (props) {
=======
class DisplayTasks extends Component {
  constructor(props) {
>>>>>>> b3212d5f4ee58151d0927b824026939a788eef54
    super(props)

    this.state = {
      names: []
    }
  }
<<<<<<< HEAD
  renderString () {
    return ('hello world')
  }
=======
>>>>>>> b3212d5f4ee58151d0927b824026939a788eef54

  componentDidMount () {
    axios.get(`http://localhost:3000/tasks`)
      .then(res => {
<<<<<<< HEAD
        if (res.status !== 'success') {
=======
        if (res.data.status !== 'success') {
>>>>>>> b3212d5f4ee58151d0927b824026939a788eef54
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

<<<<<<< HEAD
  render () {
=======
  render() {
>>>>>>> b3212d5f4ee58151d0927b824026939a788eef54
    return (
      <div id='allTasks'>
        <h2>All tasks</h2>
        <ul>
<<<<<<< HEAD
          {this.state.names.map(current =>
            <li key={current.taskID}>{current.taskName}</li>
=======
        {this.state.names.map(current =>
          <li>{current.taskName} - {current.assignTo} - {current.dueDate} - {current.desc}</li> // key
>>>>>>> b3212d5f4ee58151d0927b824026939a788eef54
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
