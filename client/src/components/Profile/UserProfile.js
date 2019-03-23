import React from 'react'
import UserInfo from './UserInfo'
import UserStories from './UserStories'
import withAuth from '../withAuth'

const UserProfile = ({ session }) => (
	<div className="Home">
		<div className="center">
			<UserInfo currentUser={session.getCurrentUser} />
			<UserStories username={session.getCurrentUser.username}/>
		</div>
	</div>
)

export default withAuth(session => session && session.getCurrentUser)(UserProfile)