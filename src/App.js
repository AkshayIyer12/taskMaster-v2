import React, { Component } from 'react'
import './App.css'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: []
    }
  }
  renderString() {
    return ('hello world')
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/tasks`)
      .then(res => {
        if(res.status !== 'success'){
          // handle Error
        }

        console.log(res.data)
        const taskNames = res.data.map(current => current.taskName)
        this.setState({ taskNames })
        // const posts = res.data.data.children.map(obj => obj.data)
        // this.setState({ posts })
      })
  }

  render() {
    return (
      <div>
        <ul>
        {
        this.state.posts.map(post =>
        <li>{post}</li>
        )
        }
        </ul>
      </div>
    )
  }
}

export default App


