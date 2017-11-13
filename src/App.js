import React from 'react'


class Greeting extends React.Component {
  render() {
    return (
      <h2>Hello {this.props.name}!</h2>
    );
  }
}

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			taskName: '',
			assignTo: '',
			dueDate: '',
			desc:''
		}
		this.addTask = this.addTask.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange({
		target
	}){
		this.setState({
			[target.name]: target.value
		})
	}

	addTask() {
		console.log(this.state)
		console.log(this.props)
	}

	render() {
		return(
		<div>
			<input 
			type="text"
			name="taskName"
			placeholder="Name"
			value={ this.state.taskName }
			onChange={ this.handleChange } 
			/>
			
			<input
			type="text"
			name="assignTo"
			placeholder="Assign To"
			value={ this.state.assignTo }
			onChange={ this.handleChange }
			/>

			<input
			type="text"
			name="dueDate"
			placeholder="Due Date"
			value={ this.state.dueDate }
			onChange={ this.handleChange }
			/>

			<input
			type="text"
			name="desc"
			placeholder="Description"
			value={ this.state.desc }
			onChange={ this.handleChange }
			/>
		
			<button value="Send" onClick={ this.addTask }>Add</button>

			<Greeting name="my B" />
		</div>
	)
	}
}

export default App
