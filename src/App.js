import React, { Component } from 'react'
import './App.css'
import axios from 'axios'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      names: []
    }
  }
  renderString () {
    return ('hello world')
  }

  componentDidMount () {
    axios.get(`http://localhost:3000/tasks`)
      .then(res => {
        if (res.status !== 'success') {
          // handle Error
        }

        const names = res.data.data.map(currentTask => currentTask)
        this.setState({ names })
      })
  }

  render () {
    return (
      <div id='allTasks'>
        <ul>
          {this.state.names.map(current =>
            <li key={current.taskID}>{current.taskName}</li>
        )}
        </ul>
      </div>
    )
  }
}

export default App
