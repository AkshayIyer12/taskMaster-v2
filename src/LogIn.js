import React, { Component } from 'react'

class LogIn extends Component {

  componentDidMount() {
    const cookieList = document.cookie.split(';')
    let id = ''
    for(let i of cookieList) {
      if(i.startsWith(' userId')) id = i.slice(8).trim()
    }

    this.props.onStoreUserId(id)
  }
  
  openGoogle() {
    window.open('http://localhost:3000/auth/google', '')
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
