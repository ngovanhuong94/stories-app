import React, { Component } from 'react'
import { ApolloConsumer } from 'react-apollo'
import { withRouter } from 'react-router-dom'

class Signout extends Component {
	handleLogout (client, history) {
		localStorage.setItem('token', '')
		client.resetStore()
		history.push('/')
	}
	render () {
		return (
			<ApolloConsumer>
				{
					client => <a href="/#"
								onClick={() => this.handleLogout(client, this.props.history)} 
								style={{ cursor: 'pointer'}}
							  >
							Logout
							</a>
				}
			</ApolloConsumer>
		)
	}
}


export default withRouter(Signout)