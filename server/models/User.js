const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	favorites: {
		type: [Schema.Types.ObjectId],
		ref: 'Story'
	}
})



module.exports = mongoose.model('User', userSchema)