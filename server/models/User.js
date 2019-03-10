const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = required('bcryptjs')

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
	}
})

// add middleware to mongoose schema
userSchema.pre('save', function (next) {
	// hash user password before save
	if (this.password && !this.isModified('password')) {
		const salt = bcrypt.genSalt(10, function (err, salt) {
			bcrypt.hash(this.password, salt, function (err, hash) {
				this.password = hash
			})
		})
	}
	next()
})

module.exports = mongoose.model('User', userSchema)