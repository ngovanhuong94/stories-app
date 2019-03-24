import React, { Component } from 'react'
import withSession from '../withSession'
import { Mutation } from 'react-apollo'
import { LIKE_STORY, UNLIKE_STORY, GET_STORY } from '../../queries'


class LikeStory extends Component {
	state = {
		liked: false 
	}

	componentDidMount () {
		// have logged in user
		if (this.props.session.getCurrentUser) {
			// favorites posts array
			const { favorites } = this.props.session.getCurrentUser
			// check this post id in the favorites array
			const isLiked = favorites.some(r => r.id === this.props.id)
			// set liked state
			if (isLiked) {
				this.setState({ liked: true })
			}
		}
	}

	handleLike = async (likeStory) => {
		if (!this.state.liked) {
			const { data } = await likeStory()
			await this.props.refetch()
			this.setState({ liked: !this.state.liked })
			return data
		}
	}

	handleUnlike = async (unlikeStory) => {
		if (this.state.liked) {
			const { data } = await unlikeStory()
			await this.props.refetch()
			this.setState({ liked: !this.state.liked })
			return data
		}
	}

	updateLike = async (cache, { data: { likeStory }}) => {
		const { id } = this.props
		const { getStory } = cache.readQuery({ query: GET_STORY, variables: { id }})
		cache.writeQuery({
			query: GET_STORY,
			variables: { id },
			data: {
				getStory: { ...getStory, likes: likeStory.likes + 1}
			}
		})
	}

	updateUnlike = async (cache, { data: { unlikeStory }}) => {
		const { id } = this.props
		const { getStory } = cache.readQuery({ query: GET_STORY, variables: { id }})
		cache.writeQuery({
			query: GET_STORY,
			variables: { id },
			data: {
				getStory: { ...getStory, likes: unlikeStory.likes - 1}
			}
		})
	}

	render () {
		const { id } = this.props
		const { 
			getCurrentUser
		} = this.props.session
		return (
			getCurrentUser && <div className="block-vote">
				{ this.state.liked 
					? (<Mutation
							mutation={UNLIKE_STORY}
							variables={{ id }}
							update={this.updateUnlike}
						>
						{unlikeStory => (
							<span 
								className="unlike-button"
								onClick={() => this.handleUnlike(unlikeStory)}
							>
								Unlike
							</span>)
						}
					  </Mutation>)
					: (
						<Mutation 
							mutation={LIKE_STORY}
							variables={{ id }}
							update={this.updateLike}
						>
							{likeStory => (
								<span 
									className="like-button"
									onClick={() => this.handleLike(likeStory)}
								>Like</span>
							)}
						</Mutation>
						)
				}
			</div>
		)
	}
}


export default withSession(LikeStory)