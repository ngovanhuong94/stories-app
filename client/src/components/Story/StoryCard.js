import React, { Component } from 'react'

class StoryCard extends Component {

	render () {
		const { imageUrl, author, title, category } = this.props.story
		return (
			<div className="card">
				<img 
					src={imageUrl}
					style={{ width: '100%'}}
					alt=""
				/>
				<h1>{title}</h1>
				<p className="card-category">{category}</p>
				<p>by <a href="/#">{author}</a></p>
				<p>
					<button className="card-button">View More</button>
				</p>
			</div>
		)
	}
}


export default StoryCard
