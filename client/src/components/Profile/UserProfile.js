import React from 'react'
import UserInfo from './UserInfo'
import UserStories from './UserStories'

const UserProfile = () => (
	<div className="Home">
		<div className="center">
			<UserInfo />
			<UserStories />
		</div>
	</div>
)

export default UserProfile