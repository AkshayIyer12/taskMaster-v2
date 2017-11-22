import React, { Component } from 'react'

class LogIn extends Component {
  
  LogInClicked () {
    console.log('log in!')
    
  }

  render () {
    return (
      <div>
        <button onClick={this.LogInClicked.bind(this)}>Log In</button>
      </div>
    )
  }
}

export default LogIn
