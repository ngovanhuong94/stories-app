import React from 'react'
import { Query } from 'react-apollo'
import { GET_CURRENT_USER } from '../queries'
import { Redirect } from 'react-router-dom'

const withAuth = (checkFunc) => Component => props => (
	<Query query={GET_CURRENT_USER}>
		{({ data, loading }) => {
			if (loading) return <div>Loading...</div>
			return checkFunc(data) ? <Component {...props} /> : <Redirect to="/" />
		}}
	</Query>
)

export default withAuth