import React, { Component } from 'react'

class Signin extends Component {
	constructor (props) {
		super(props)
		this.state = {
			username: '',
			password: ''
		}
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange (e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	render () {
		const { username, password } = this.state
		return (
			<div className="App">
				<form className="form">
					<h2>Sign In</h2>
					<input 
						type="text"
						name="username"
						placeholder="Username"
						value={username}
						onChange={this.handleChange}
					/>
					<input 
						type="password"
						name="password"
						placeholder="Password"
						value={password}
						onChange={this.handleChange}
					/>
					<button>
						Submit
					</button>
				</form>
			</div>
		)
	}
}

export default Signin