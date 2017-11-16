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
    // axios.post('/', { taskName, assignTo, dueDate, desc })
    // .then((result) => {
    //   // handle Result
    // });
  }

  render() {
    const { taskName, assignTo, dueDate, desc } = this.state
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" name="taskName" value={taskName} onChange={this.onChange} />
        <input type="text" name="assignTo" value={assignTo} onChange={this.onChange} />
        <input type="text" name="dueDate" value={dueDate} onChange={this.onChange} />
        <input type="text" name="desc" value={desc} onChange={this.onChange} />
        <button type="submit">Submit</button>
      </form>
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
