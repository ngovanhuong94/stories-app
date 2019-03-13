import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { SIGNIN_USER } from '../../queries'
import { withRouter } from 'react-router-dom'
import Error from '../Error'

class Signin extends Component {
	constructor (props) {
		super(props)
		this.state = {
			username: '',
			password: ''
		}
		this.handleChange = this.handleChange.bind(this)
		this.validateForm = this.validateForm.bind(this)
	}

	handleChange (e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	validateForm () {
		const { username, password } = this.state
		// validate required inputs
		return !username || !password
	}
	render () {
		const { username, password } = this.state
		return (
			<div className="App">
				<Mutation mutation={SIGNIN_USER}>
					{ (signinUser, { data, loading, error }) => (
						<form 
							className="form" 
							onSubmit={async (e) => { 
									e.preventDefault()
									// send data to server
									const { data } = await signinUser({ 
										variables: {
											username,
											password
										}
									})
									// save token to local storage
									localStorage.setItem('token', data.signinUser.token)
									// reset current User
									await this.props.refetch()
									// clear state
									this.setState({ username: '', password: '' })
									// redirect to home page
									this.props.history.push('/')
							}}
						>
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

export default withRouter(Signin)