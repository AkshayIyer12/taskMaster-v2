import React, { Component } from 'react'
import axios from 'axios'
import { Switch, Route, Link } from 'react-router-dom'
import './App.css'
import NewTaskForm from './NewTaskForm'
import IndividualTask from './IndividualTask'
import TaskDetails from './TaskDetails'


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
              <IndividualTask key={current._id} currentTask={current} onChange={this.props.onChange} />
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
    console.log('onChange in tasklistandform')
    this.loadData()
  }

  render() {
    return (
      <div>
        <NewTaskForm onChange={this.onChange.bind(this)} />
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
          <ul className='nav-bar'>
            <li className="nav-list"><Link to='/'>Home</Link></li>
            <li className="nav-list"><Link to='/logIn'>Log In</Link></li>
            <li className="nav-list"><Link to='/taskListAndForm'>Tasks</Link></li>
            <li className="nav-list"><Link to='/task/:taskid'>Current Task</Link></li>
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
        <Route path='/LogIn' component={LogIn}/>
        <Route path='/taskListAndForm' component={TaskListAndForm}/>
        <Route path='/task/:taskid' component={TaskDetails}/>
      </Switch>
      </main>
    )
  }
}

class LogIn extends Component {
  
  render () {
    return (
      <div>
        log in
      </div>
    )
  }
}

class Home extends Component {

  onClick() {
    console.log('clicked')
    // this.props.router.push(`/tasks`)
    console.log(this.props.router)
  }
  render () {
    return (
      <div>
      <h1>home</h1>
      <Link to='/taskListAndForm'>all tasks</Link>
      </div>
    )
  }
}

export default App
