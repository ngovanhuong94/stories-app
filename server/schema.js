exports.typeDefs = `
	type User {
		username: String!
		email: String!
	}


	type Mutation {
		signupUser(username: String!, password: String!, email: String!): String!
	}

`