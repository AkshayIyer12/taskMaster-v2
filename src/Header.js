import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {

  logOut() {
    window.open('http://localhost:3000/logout', '_self')
  }
  render () {
    return (
      <header>
        <nav>
          <ul className='nav-bar'>
            <li className="nav-list"><Link to='/'>Home</Link></li>
            <li>
              <button onClick={this.logOut} className='logout-button'>Log Out
              </button>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header
