exports.typeDefs = `
	type User {
		username: String!
		email: String!
	}

	type Token {
		token: String!
	}

	type Query {
		getCurrentUser: String!
	}

	type Mutation {
		signupUser(username: String!, password: String!, email: String!): Token!
	}

`