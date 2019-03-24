import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'
import { GET_USER_STORIES, GET_FEED, DELETE_STORY, GET_CURRENT_USER } from '../../queries'

class UserStories extends Component {
	handleDeleteStory = async (deleteStory) => {
		// show dialog 
		const confirmDelete = window.confirm('Are you want to delete this story?')
		// confirmed delete
		if (confirmDelete) {
			const { data } = await deleteStory()
			return data
		}
	}
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
										<Mutation
											mutation={DELETE_STORY}
											variables={{ id: story.id }}
											refetchQueries={() => [
												{ query: GET_FEED },
												{ query: GET_CURRENT_USER }
											]}
											update={(cache, { data: { deleteStory }}) => {
												const { getUserStories } = cache.readQuery({ 
													query: GET_USER_STORIES ,
													variables: { username}
												})
												cache.writeQuery({
													query: GET_USER_STORIES,
													variables: { username },
													data: {
														getUserStories: getUserStories.filter(
															s => s.id !== deleteStory.id
														)
													}
												})
											}}
										>
											{(deleteStory) => (
												<span
													onClick={() => this.handleDeleteStory(deleteStory)} 
													className="delete-button"
												>
													Delete
												</span>
											)}
										</Mutation>
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