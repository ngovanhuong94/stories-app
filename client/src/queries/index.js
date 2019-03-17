import gql from 'graphql-tag'

export const SIGNUP_USER = gql`
	mutation signupUser($username: String!, $email: String!, $password: String!) {
		signupUser (username: $username, email: $email, password: $password) {
			token
		}
	}
`

export const SIGNIN_USER = gql`
	mutation signinUser($username: String!, $password: String!) {
		signinUser (username: $username, password: $password) {
			token
		}
	}
`

export const GET_CURRENT_USER = gql`
	query getCurrentUser {
		getCurrentUser {
			email
			username
		}
	}
`


export const ADD_STORY = gql`
	mutation addStoryMutation(
					$title: String!, 
					$category: String, 
					$description: String!,
					$text: String!,
					$imageUrl: String!
				) {
		addStory (	title: $title,
					description: $description,
					text: $text,
					imageUrl: $imageUrl,
					category: $category ) {
			title
			description
			imageUrl
			category
			text
			author
			createdAt
		}
	}
`