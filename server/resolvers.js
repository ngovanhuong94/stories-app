const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.resolvers = {
	Query: {
		getCurrentUser: async (root, args, { currentUser, User }) => {
			// check empty currentUser
			if (!currentUser) {
				return null
			}
			const user = await User.findOne({ username: currentUser.username })
									.populate({
										path: 'favorites',
										model: 'Story'
									})
			return user 
		},
		getFeed: async (root, { cursor }, { Story }) => {
			// stories per page

			const limit = 5
			let stories = []

			if (cursor) {
				stories = await Story.find({ _id: { $lt: cursor }})
									.sort({ createdAt: -1 })
									.limit(limit)
									.exec()
			} else {
				stories = await Story.find({})
									.sort({ createdAt: -1 })
									.limit(limit)
									.exec()
			}
			// cursor is length -1 element
			cursor = stories.length > 0 ? stories[stories.length -1].id : cursor
			return {
				cursor,
				stories
			}
		},
		getStory: async (root, { id }, { Story }) => {
			const story = await Story.findById(id)
			return story
		},
		getUserStories: async (root, { username }, { Story }) => {
			const stories = await Story.find({ author: username })
			return stories
		},
		getStoriesByCategory: async (root, { category }, { Story }) => {
			try {
				const stories = await Story.find({ category: category })
											.sort({ createdAt: -1 , likes: 'desc'})
											.exec()
				return stories
			} catch (error) {
				throw new Error('Something went wrong')
			}
		}, 
		searchStories: async (root, { searchText }, { Story }) => {
			let stories
			if (searchText) {
				stories = await Story.find({
					$text: { $search: searchText }  
				})
				.sort({ createdAt: -1, likes: 'desc' })
				.exec()
			} else {
				stories = await Story.find({})
							.limit(10)
							.sort({ createdAt: -1, likes: 'desc' })
							.exec()
			}
			return stories
		}
	},
	Mutation: {
		addStory: async (root, { title, 
								imageUrl,
								description, 
								text, 
								category 
							}, { currentUser, Story }) => {
			if (!currentUser) {
				throw new Error('Unauthorized')
			}
	
			const newStory = await new Story({
				title,
				description,
				text,
				imageUrl,
				category,
				author: currentUser.username
			}).save()

			return newStory
		},
		deleteStory: async (root, { id }, { currentUser, Story, User }) => {
			// user unauthorizaed
			if (!currentUser) {
				throw new Error('Unauthorized')
			}
			
			const story = await Story.findById(id)
			if (!story) {
				throw new Error('Story not found')
			}
			// user not author of story
			if (story.author !== currentUser.username) {
				throw new Error("Can't delete this story")
			}

			await story.remove()
			return story
		},
		likeStory: async (root, { id }, { currentUser, Story, User }) => {
			// user not authorized
			if (!currentUser) {
				throw new Error('Unauthorized')
			}

			try { 
				// find story and update
				const story = await Story.findOneAndUpdate(
					{ _id: id }, 
					{ $inc: { likes: 1 }}
				)
				// find user and update
				const user = await User.findOneAndUpdate(
					{ username: currentUser.username },
					{ $addToSet: { favorites: id }}
				)

				return story 
			} catch (err) {
				console.log(err)
			}
		},
		unlikeStory: async (root, { id }, {currentUser, Story, User}) => {
			if (!currentUser) {
				throw new Error('Unauthorized')
			}

			try {
				// find story and update
				const story = await Story.findOneAndUpdate(
					{ _id: id },
					{ $inc: { likes: -1 }}
				)
				// find user and update
				const user = await User.findOneAndUpdate(
					{ username: currentUser.username },
					{ $pull: { favorites: id }}
				)
				return story 
			} catch (err) {
				console.log(err)
			}
		},
		signupUser: async (root, { username, password, email }, { User }) => {
			// find user with username
			const user = await User.findOne({ username })
			if (user) {
				throw new Error('Username was used')
			}
			// create hash password
			const salt = bcrypt.genSaltSync(10)
			const hash_password = bcrypt.hashSync(password, salt)
			// save new user to database
			const newUser = new User({ 
				username, 
				password: hash_password, 
				email 
			})
			await newUser.save()
			// create token with user data
			const token = jwt.sign({ username, email }, process.env.SECRET, { expiresIn: '1d' })
			// return token to client
			return { token }
		},
		signinUser: async (root, { username, password }, { User }) => {
			// find user with username
			const user = await User.findOne({ username })
			if (!user) {
				throw new Error('User not found')
			}
			// check password and hash password is same
			const isMatch = bcrypt.compareSync(password, user.password)
			if (!isMatch) {
				throw new Error('Password invalid')
			}
			// create token with user data
			const token = jwt.sign(
				{ 
					username, email: user.email 
				}, 
				process.env.SECRET, 
				{ expiresIn: '1d'}
			)
			// return token to client
			return { token }
		}
	}
}