import React from 'react'
import { Query } from 'react-apollo'
import { GET_STORIES_BY_CATEGORY } from '../../queries'
import StoryCard from './StoryCard'

const StoriesByCategory = ({
	match: {
		params: { category }
	}
}) => (
	<Query
		query={ GET_STORIES_BY_CATEGORY }
		variables={{ category }}
	>
		{({ data, loading, error }) => {
			if (loading || !data) return <div>Loading...</div>
			if (error) return <div>{`${error}`}</div>
			const { getStoriesByCategory } = data
			return (getStoriesByCategory && 
				getStoriesByCategory.length > 0 
				?
					<div className="Home">
						<div className="center">
							<h2>Stories in category: '{category}' </h2>
							{ getStoriesByCategory.map(story => <StoryCard 
																key={story.id} 
																story={story}
														/>)}
						</div>
					</div>
				:
				 <div className="Home">
				 	<div className="center">
				 		<small>Doesn't have any story in this category</small>
				 	</div>
				 </div>
			)
		}}
	</Query>)

export default StoriesByCategory