import React, { Component } from 'react'
import { ApolloConsumer } from 'react-apollo'
import { SEARCH_STORIES } from '../../queries'
import StoryCard from './StoryCard'

class SearchStory extends Component {
	state = {
		searchResults: []
	}

	handleChange = (results) => { 
		console.log(results)
		this.setState({ searchResults: results })
	}
	render () {
		const { searchResults } = this.state
		return (
			<ApolloConsumer>
				{client => (
					<div className="Home">
						<div className="center">
							<input 
								placeholder="search for stories"
								onChange={async (e) => {
									e.persist()

									const searchText = e.target.value.trim()
									// search text must >= 3 characters
									if (searchText.length >= 3) {
										const { 
											data: { searchStories } 
										} = await client.query({
											query: SEARCH_STORIES,
											variables: { searchText: e.target.value.trim() }
										})

										return this.handleChange(searchStories)
									}
								}}
							/>
							
							{searchResults.map(story => (
								<StoryCard key={story.id} story={story}/>
							))}
						</div>
					</div>
				)}
			</ApolloConsumer>
		)
	}
} 


export default SearchStory