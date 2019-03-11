import React, { Component } from 'react'

class Signup extends Component {
	constructor (props) {
		super(props)
		this.state = {
			username: '',
			email: '',
			password: '',
			password2: ''
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange (e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	handleSubmit (e) {
		e.preventDefault()
		console.log('Submited')
	}
	render () {
		const { username, email, password, password2 } = this.state 

		return (
			<div className="content">
				<h2>Register</h2>
				<form className="form" onSubmit={this.handleSubmit}>
					<input 
						type="text"
						placeholder="Username"
						name="username"
						onChange={this.handleChange}
						value={username}
					/>
					<input 
						type="text"
						name="email"
						placeholder="Email"
						onChange={this.handleChange}
						value={email}
					/>
					<input 
						type="password"
						placeholder="Password"
						name="password"
						onChange={this.handleChange}
						value={password}
					/>
					<input 
						type="password"
						name="password2"
						placeholder="Repeat password"
						onChange={this.handleChange}
						value={password2}
					/>
					<button type="submit">
						Submit
					</button>
				</form>
			</div>
		)
	}
}

export default Signup