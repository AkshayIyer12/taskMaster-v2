import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {


  render () {
    return (
      <header>
        <nav>
          <ul className='nav-bar'>
            <li className="nav-list"><Link to='/'>Home</Link></li>
            {/* <li className="nav-list"><Link to='/logIn'>Log In</Link></li> */}
            <li className="nav-list"><Link to='/taskListAndForm'>Tasks</Link></li>
            {/* <li className="nav-list"><Link to='/task/:taskid'>Current Task</Link></li> */}
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header
