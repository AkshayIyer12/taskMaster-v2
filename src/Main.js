import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import LogIn from './LogIn'
import Home from './Home'
import TaskList from'./TaskList'
import TaskDetails from './TaskDetails'
import NewTask from './NewTask'

class Main extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
        id: ''
      }
    }
  
    // storeUserId(id) {
    //   const state = this.state
    //   state.id = id
    //   this.setState(state)
    //   console.log('id in main component', this.state)
    // }
  
  render () {
    // const LogInWithProps = () => (
    //   <LogIn onStoreUserId={this.storeUserId.bind(this)} />
    // );

    return (
      <Switch>
        <Route exact path='/' component={TaskList}/>
        {/* <Route path='/LogIn' render={LogInWithProps}/> */}
        <Route path='/LogIn' component={LogIn}/>
        <Route path='/taskList' component={TaskList}/>
        <Route path='/task/:taskid' component={TaskDetails}/>
        <Route path='/newtask' component={NewTask}/>
        <Route path='/logout'/>
      </Switch>
    )
  }
}

export default Main
