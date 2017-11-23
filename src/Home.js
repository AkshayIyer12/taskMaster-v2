import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {
  
  onClick() {
    this.props.router.push(`/tasks`)
  }

  render () {
    return (
      <div>
      <h1>home</h1>
      <Link to='/taskList'>all tasks</Link>
      </div>
    )
  }
}

export default Home
