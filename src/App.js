import React, { Component } from 'react'
import axios from 'axios'
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import './App.css'
import TaskForm from './TaskForm'
import RenderTask from './RenderTask'

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
              <RenderTask key={current._id} currentTask={current} onChange={this.props.onChange} />
            )
          }
        </ul>
      </div>
    )
  }
}

class TaskListAndForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      taskList: []
    }
  }

  loadData() {
    axios.get(`http://localhost:3000/tasks`)
      .then(res => {
        if (res.data.status !== 'success') {
          // handle Error
        } else {
          const taskList = res.data.data.map(currentTask => {
            return currentTask
          })

          this.setState({
            taskList
          })
        }
      })
  }

  componentDidMount() {
    this.loadData()
  }

  onChange() {
    console.log('onChange - tasklistandform')
    this.loadData()
  }

  render() {
    return (
      <div>
        <TaskForm onChange={this.onChange.bind(this)} />
        <Tasks value={this.state.taskList} onChange={this.onChange.bind(this)} />
      </div>
    )
  }
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    )
  }
}

class Header extends Component {
  render () {
    return (
      <header>
        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/taskListAndForm'>Tasks</Link></li>
            <li><Link to='/placeholder'>PlaceHolder</Link></li>
          </ul>
        </nav>
      </header>
    )
  }
}

class Main extends Component {
  render () {
    return (
      <main>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/taskListAndForm' component={TaskListAndForm}/>
        {/* <Route path='/green' component={Green}/> */}
      </Switch>
      </main>
      
    )
  }
}

class Home extends Component {
  render () {
    return (
      <h1>home</h1>
    )
  }
}

export default App
