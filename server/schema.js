exports.typeDefs = `
	type User {
		username: String!
		email: String!
	}

	type Story {
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

	type Query {
		getCurrentUser: User
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