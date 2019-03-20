import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class StoryCard extends Component {

	render () {
		const { imageUrl, author, title, category, id } = this.props.story
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
					<Link className="card-button" to={`/story/${id}`}>View More</Link>
				</p>
			</div>
		)
	}
}


export default StoryCard
