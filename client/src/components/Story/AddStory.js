import React, { Component } from 'react'
import CKEditor from 'react-ckeditor-component'

class AddStory extends Component {
	constructor (props) {
		super(props)

		this.state = {
			title: '',
			imageUrl: '',
			description: '',
			category: '',
			text: ''
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChangeText = this.handleChangeText.bind(this)
	}

	handleChange (e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	handleChangeText(e) {
		this.setState({ text: e.editor.getData() })
	}

	handleSubmit (e) {
		e.preventDefault()

		const storyData = {
			title: this.state.title,
			imageUrl: this.state.imageUrl,
			description: this.state.description,
			category: this.state.category,
			text: this.state.text
		}

		console.log(storyData)
	}

	render () {
		const { title, description, imageUrl, category, text } = this.state
		return (
			<div className="App">
				<form 
					className="form"
					onSubmit={this.handleSubmit}
				>
					<h2>Add Story</h2>
					<input 
						type="text"
						placeholder="Title"
						name="title"
						value={title}
						onChange={this.handleChange}
					/>
					<input
						type="text"
						placeholder="ImageUrl"
						name="imageUrl"
						value={imageUrl}
						onChange={this.handleChange}
					/>
					<select
						name="category"
						value={category}
						onChange={this.handleChange}
					>
						<option value="category1">Category 1</option>
						<option value="category2">Category 2</option>
						<option value="category3">Category 3</option>
					</select>
					<textarea 
						type="text"
						placeholder="description"
						name="description"
						value={description}
						onChange={this.handleChange}
					/>
					<CKEditor
						content={text} 
						events={{
							"change": this.handleChangeText
						}}
					/>
					<button type="submit">
						Submit
					</button>
				</form>
			</div>
		)
	}
}


export default AddStory