import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import './App.css'
import TaskDetails from './TaskDetails'
import TaskListAndForm from'./TaskListAndForm'
import NewTask from './NewTask'
import LogIn from './LogIn'

class App extends Component {

  constructor(props) {
    super(props)
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
            {/* <li className="nav-list"><Link to='/task/:taskid'>Current Task</Link></li> */}
          </ul>
        </nav>
      </header>
    )
  }
}

class Main extends Component {

constructor(props) {
  super(props)
  this.state = {
      id: ''
    }
  }

  storeUserId(id) {
    const state = this.state
    state.id = id
    this.setState(state)
    console.log(this.state)
  }

  render () {
    const LogInWithProps = () => (
      <LogIn onStoreUserId={this.storeUserId.bind(this)} id={this.state.id}/>
    );

    return (
      // <main>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/LogIn' render={LogInWithProps}/>
        <Route path='/taskListAndForm' component={TaskListAndForm}/>
        <Route path='/task/:taskid' component={TaskDetails}/>
        <Route path='/newtask' component={NewTask}/>
      </Switch>
      // </main>
    )
  }
}

class Home extends Component {

  onClick() {
    // console.log('clicked')
    this.props.router.push(`/tasks`)
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
