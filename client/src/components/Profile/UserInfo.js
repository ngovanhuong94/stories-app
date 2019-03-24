import React from 'react'
import { Link } from 'react-router-dom'


const UserInfo = ({ currentUser }) => (
	<div>
		<h2>User Profile</h2>
		<p>Username: {currentUser.username}</p>
		<p>Email: {currentUser.email}</p>
		<p>createdAt: 20.03.2019</p>
		<ul>
			<h5>{currentUser.username}'s favorites stories</h5>
			{ currentUser.favorites.length ? (
				currentUser.favorites.map(story => (
					<li key={story.id}>
						<p>
							<Link 
								className="story-link" 
								to={`/story/${story.id}`}>
								{story.title}
							</Link>
						</p>
					</li>
				))
			) :
				<small>
					<strong>{currentUser.username} doesn't have favorite story</strong>
				</small>
		}
		</ul>
	</div>
)

export default UserInfo