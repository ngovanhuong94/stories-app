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
					$category: String!, 
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

export const GET_FEED = gql`
	query getFeedQuery ($cursor: String) {
		getFeed (cursor: $cursor) {
			cursor
			stories {
				id
				title
				imageUrl
				category
				author
			}
		}
	}
`


export const GET_STORY = gql`
	query getStoryQuery ($id: ID!) {
		getStory (id: $id) {
			id
			title
			imageUrl
			description
			category
			text
			createdAt
			likes
		}
	}
`

export const LIKE_STORY = gql`
	mutation likeStoryMutation ($id: ID!) {
		likeStory (id: $id) {
			id
			title
			imageUrl
			description
			category
			text
			createdAt
			likes
		}
	}
`

export const UNLIKE_STORY = gql`
	mutation unlikeStoryMutation ($id: ID!) {
		unlikeStory (id: $id) {
			id
			title
			imageUrl
			description
			category
			text
			createdAt
			likes
		}
	}
`