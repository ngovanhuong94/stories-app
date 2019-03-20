import React from 'react'
import { NavLink } from 'react-router-dom'
import Signout from './Auth/Signout'

const GuessNavbar = () => (
	<ul className="topnav">
		<li>
			<NavLink to="/">Home</NavLink>
		</li>
		<li>
			<NavLink to="/search">Search</NavLink>
		</li>
		<li className="right">
			<NavLink to="/signin">Login</NavLink>
		</li>
		<li className="right">
			<NavLink to="/signup">Register</NavLink>
		</li>
	</ul>

)

const AuthNavbar = () => (
	<ul className="topnav">
		<li>
			<NavLink to="/">Home</NavLink>
		</li>
		<li>
			<NavLink to="/search">Search</NavLink>
		</li>
		<li className="right">
			<Signout />
		</li>
		<li className="right">
			<NavLink to="/profile">Profile</NavLink>
		</li>
		<li className="right">
			<NavLink to="/add-story">Add Story</NavLink>
		</li>
	</ul>
)

const Navbar = ({ session }) => {
	return (session && session.getCurrentUser) ? <AuthNavbar /> : <GuessNavbar />
}


export default Navbar