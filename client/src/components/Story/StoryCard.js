import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class StoryCard extends Component {

	render () {
		const { imageUrl, author, title, category, id, likes } = this.props.story
		return (
			<div className="card">
				<img 
					src={imageUrl}
					style={{ width: '100%'}}
					alt=""
				/>
				<h1>{title}</h1>
				<p className="card-category">
					<Link to={`/category/${category}`}>{category}</Link>
				</p>
				<p>{likes} <strong className="heart-icon">&#9825;</strong></p>
				<p>by <Link to={`/user/${author}`}>{author}</Link></p>
				<p>
					<Link className="card-button" to={`/story/${id}`}>View More</Link>
				</p>
			</div>
		)
	}
}


export default StoryCard
