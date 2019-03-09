import React from 'react'
import { NavLink } from 'react-router-dom'


const Navbar = () => (
	<nav>
		<ul>
			<li>
				<NavLink to="/">Home</NavLink>
			</li>
			<li>
				<NavLink to="/search">Search</NavLink>
			</li>
			<li>
				<NavLink to="/signin">Login</NavLink>
			</li>
			<li>
				<NavLink to="/signup">Register</NavLink>
			</li>
		</ul>
	</nav>
)

export default Navbar