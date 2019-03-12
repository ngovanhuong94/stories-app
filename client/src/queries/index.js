import gql from 'graphql-tag'

export const SIGNUP_USER = gql`
	mutation signupUser($username: String!, $email: String!, $password: String!) {
		signupUser (username: $username, email: $email, password: $password) {
			token
		}
	}
`