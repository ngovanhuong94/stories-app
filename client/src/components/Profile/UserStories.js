import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import { GET_USER_STORIES } from '../../queries'

class UserStories extends Component {
	render () {
		const { username } = this.props
		return (
			<ul>	
				<h5>Your stories</h5>
				<Query
					query={GET_USER_STORIES}
					variables={{ username }}
				>
					{({ data, loading, error}) => {
						if (loading) return <div>Loading...</div>
						if (error) return <div>{`${error}`}</div>
						const { getUserStories } = data
						return (
							getUserStories.length && 
							getUserStories.map(story => (
								<li key={story.id}>
									<p>
										<Link className="story-link" to={`/story/${story.id}`}>{story.title}</Link>
										<span className="delete-button">Delete</span>
									</p>
								</li>
							))
						)
					}}
				</Query>
			</ul>
		)
	}
} 



export default UserStories