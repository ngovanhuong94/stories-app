exports.typeDefs = `
	type User {
		username: String!
		email: String!
	}

	type Story {
		id: ID!
		title: String!
		imageUrl: String!
		description: String!
		category: String!
		author: String!
		createdAt: String!
		text: String!
		likes: Int!
	}	

	type Token {
		token: String!
	}

	type Feed {
		cursor: String!
		stories: [Story]
	}

	type Query {
		getCurrentUser: User
		getFeed(cursor: String): Feed
		getStory(id: ID!): Story
	}

	type Mutation {
		addStory(
			title: String!
			imageUrl: String!
			description: String!
			category: String!
			text: String!
		): Story
		signupUser(username: String!, password: String!, email: String!): Token!
		signinUser(username: String!, password: String!): Token!
	}

`