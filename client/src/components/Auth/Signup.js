import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { SIGNUP_USER } from '../../queries'
import { Mutation } from 'react-apollo'
import Error from '../Error'

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
		this.validateForm = this.validateForm.bind(this)
	}

	handleChange (e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	validateForm () {
		// check required inputs
		const { username, email, password, password2 } = this.state
		return !username || !email || !password || !password2 || (password2 !== password)
	}

	render () {
		const { username, email, password, password2 } = this.state 

		return (
			<div className="content">
				<h2>Register</h2>
				<Mutation 
					mutation={SIGNUP_USER} 
				>	
				{(signupUser, { data, loading, error }) => (
					<form 
						className="form"
						onSubmit={async (e) => {
							try  {
								e.preventDefault()
								// get token from graphql server
								const {data} = await signupUser({ variables: { username, password, email }})
								// save token to local storage
								localStorage.setItem('token', data.signupUser.token)
								// reload current user data
								await this.props.refetch()
								// clear current state
								this.setState({ email: '', password: '', password2: '', username: ''})
								// redirect to home page
								this.props.history.push('/')
	
							} catch (err) {
								console.log(err)
							}
						}}
					>
						<input 
							type="text"
							value={username}
							onChange={this.handleChange}
							placeholder="Username"
							name="username"
						/>
						<input 
							type="text"
							value={email}
							onChange={this.handleChange}
							placeholder="Email"
							name="email"
						/>
						<input 
							type="password"
							value={password}
							onChange={this.handleChange}
							placeholder="Password"
							name="password"
						/>
						<input 
							type="password"
							value={password2}
							onChange={this.handleChange}
							placeholder="Repeat password"
							name="password2"
						/>
						<button 
							type="submit"
							disabled={loading || this.validateForm()}
						>
							Submit
						</button>
						{ error ? <Error message={error.message.split(':')[1]}/> : ''}
					</form>	
				)}
				</Mutation>
			</div>
		)
	}
}

export default withRouter(Signup)