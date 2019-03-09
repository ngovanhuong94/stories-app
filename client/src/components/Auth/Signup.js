import React, { Component } from 'react'

class Signup extends Component {
	render () {
		return (
			<div className="content">
				<h2>Register</h2>
				<form className="form">
					<input 
						type="text"
						placeholder="Username"
					/>
					<input 
						type="text"
						placeholder="Email"
					/>
					<input 
						type="password"
						placeholder="Password"
					/>
					<input 
						type="password2"
						placeholder="Repeat password"
					/>
					<button>
						Submit
					</button>
				</form>
			</div>
		)
	}
}

export default Signup