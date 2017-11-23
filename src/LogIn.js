import React, { Component } from 'react'
// import axios from 'axios'

class LogIn extends Component {

  componentDidMount() {
    const cookieList = document.cookie.split(';')
    let id = ''
    for(let i of cookieList) {
      if(i.startsWith(' userId')) id = i.slice(8).trim()
    }

    // const state = this.state
    // state.id = id
    // this.setState(state)
    console.log('id', id)
    // console.log('login component id-', this.state.id)
    this.props.onStoreUserId(id)
    // while(true){
    //   // window.open('http://localhost:3001/tasks')
    // }
  }
  
  openGoogle() {
    window.open('http://localhost:3000/auth/google', '')
  }
  
  logOut () {
    // console.log('logout')
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
