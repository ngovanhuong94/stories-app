import React, { Component } from 'react'
import CKEditor from 'react-ckeditor-component'
import { Mutation } from 'react-apollo'

import withAuth from '../withAuth'
import { ADD_STORY } from '../../queries'
import Error from '../Error'

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
		// change the text editor
		this.setState({ text: e.editor.getData() })
	}

	async handleSubmit (e, addStory) {
		e.preventDefault()
		// run the mutation
		const { data } = await addStory()
		// show data to console
		console.log(data)
	}

	render () {
		const { title, description, imageUrl, category, text } = this.state
		return (
			<div className="App">
				<Mutation
					mutation={ADD_STORY}
					variables={{...this.state}}
				>
				{(addStory, { data, loading, error }) => (


					<form 
						className="form"
						onSubmit={(e) => this.handleSubmit(e, addStory)}
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
							<option>Chose here category</option>
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
						{ error ? <Error message={error.message}/> : ''}
					</form>
					)}
				</Mutation>
			</div>
		)
	}
}


export default withAuth(session => session && session.getCurrentUser)(AddStory)