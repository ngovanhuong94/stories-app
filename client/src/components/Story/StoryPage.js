import React from 'react'
import { Query } from 'react-apollo'
import { GET_STORY } from '../../queries'
import LikeStory from './LikeStory'
import Error from '../Error'
const StoryPage = ({
	match: {
		params: { id }
	}
}) => (
	<Query query={GET_STORY} variables={{ id }}>
		{({data, loading, error}) => {

		if (loading) return <div>Loading...</div>
		if (error || !data || !data.getStory) return (<div className="Home">
						<div className="center">
							<Error message={error 
										? error.message.split(':')[1] 
										: 'Story not found'}
							/>
						</div>
					</div>)
		const { getStory } = data
		
		return (<div className="Home">
			<div className="center story">
				<img 
					src={getStory.imageUrl}
					alt=""
				/>
				<div className="story-header">
					<h2>{getStory.title}</h2>
					<h5>{getStory.category}</h5>
					<p>
						Created by <strong>{getStory.author}</strong>
					</p>
					<div>
						{getStory.likes} <strong className="heart-icon">&#9825;</strong>
						<LikeStory id={id}/>
					</div>
				</div>

				<blockquote className="story-description">
						{getStory.description}
				</blockquote>
				<div 
					className="story-text"
					dangerouslySetInnerHTML={{
						__html: getStory.text
					}}
				/>
			</div>	
		</div>)
	}}
	</Query>
)


export default StoryPage