const User = require('./models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.resolvers = {
	Query: {
		hello: () => 'Hello World'
	},
	Mutation: {
		signupUser: async (root, { username, password, email }, context) => {
			const user = await User.findOne({ username })
			if (user) {
				throw new Error('Username was used')
			}

			const salt = bcrypt.genSaltSync(10)
			const hash_password = bcrypt.hashSync(password, salt)

			const newUser = new User({ 
				username, 
				password: hash_password, 
				email 
			})
			await newUser.save()
			const token = jwt.sign({ username, email }, process.env.SECRET, { expiresIn: '1d' })
			return { token }
		}
	}
}