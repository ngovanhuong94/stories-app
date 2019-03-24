// add modules
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
// add graphql modules
const { ApolloServer } = require('apollo-server-express')
const { typeDefs } = require('./schema')
const { resolvers } = require('./resolvers')

// mongoose models
const User = require('./models/User')
const Story = require('./models/Story')
// config environment
dotenv.config()

// connect MongoDB
mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useNewUrlParser', true)

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.log(err))




const app = express()

const PORT = process.env.PORT || 5000

// allow client connect to server
app.use(cors())


const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null
		let currentUser
		if (token && token !== null) {
			const currentUser = await jwt.verify(token, process.env.SECRET)
			return {
				currentUser,
				User,
				Story
			}
		} else {
			return {
				User,
				Story
			}
		}
	}
})

server.applyMiddleware({ app })

// run server
app.listen(PORT, 
	() => console.log(`Server is running on port ${PORT}`))
