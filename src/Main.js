import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import TaskList from'./TaskList'
import TaskDetails from './TaskDetails'
import NewTask from './NewTask'

class Main extends Component {
  
  render () {
    return (
      <Switch>
        <Route exact path='/' component={TaskList}/>
        <Route path='/taskList' component={TaskList}/>
        <Route path='/task/:taskid' component={TaskDetails}/>
        <Route path='/newtask' component={NewTask}/>
        <Route path='/logout'/>
      </Switch>
    )
  }
}

export default Main
