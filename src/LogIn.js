import React, { Component } from 'react'
import axios from 'axios'

class LogIn extends Component {

  openGoogle() {
    window.open('http://localhost:3000/auth/google', '_self')
  }
  
  logOut () {
    console.log('logout')
    window.open('http://localhost:3000/logout', '_self')
  }

  render () {
    return (
      <div>
          <button onClick={this.openGoogle}>Log In With Google</button>
          <button onClick={this.logOut}>Logout</button>
      </div>
    )
  }
}

export default LogIn
