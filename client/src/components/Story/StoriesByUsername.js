import React from 'react'
import { Query } from 'react-apollo'
import { GET_USER_STORIES } from '../../queries'
import StoryCard from './StoryCard'

const StoryByUsername = ({
	match: {
		params: { username }
	}
}) => (
	<Query
		query={ GET_USER_STORIES }
		variables={{ username }}
	>
		{({ data, loading, error }) => {
			if (loading || !data) return <div>Loading...</div>
			if (error) return <div>{`${error}`}</div>
			const { getUserStories } = data
			return (getUserStories && 
				getUserStories.length > 0 
				?
					<div className="Home">
						<div className="center">
							<h2>Stories by '{username}'</h2>
							{ getUserStories.map(story => <StoryCard 
																key={story.id} 
																story={story}
														/>)}
						</div>
					</div>
				:
				 <div className="Home">
				 	<div className="center">
				 		<small>This user doesn't have any story</small>
				 	</div>
				 </div>
			)
		}}
	</Query>
)

export default StoryByUsername