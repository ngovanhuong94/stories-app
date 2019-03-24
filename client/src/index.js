import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import './index.css';
import Navbar from './components/Navbar'

// pages
import Home from './components/Home';
import Signin from './components/Auth/Signin'
import Signup from './components/Auth/Signup'
import AddStory from './components/Story/AddStory'
import StoryPage from './components/Story/StoryPage'
import UserProfile from './components/Profile/UserProfile'
import SearchStory from './components/Story/SearchStory'
import StoriesByUsername from './components/Story/StoriesByUsername'
import StoriesByCategory from './components/Story/StoriesByCategory'

// wrapper session to check currentUser
import withSession from './components/withSession'

// apollo modules
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

import * as serviceWorker from './serviceWorker';

if (localStorage.getItem('token')) {
	// calculate current time
	const currentTime = Date.now() / 1000
	// decode the token from local storage
	const decode = jwt_decode(localStorage.getItem('token'))

	if (currentTime > decode.exp) {
		localStorage.removeItem('token')
	}
}


const httpLink = createHttpLink({
	uri: 'http://localhost:5000/graphql'
})

// set context to request header
const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('token')

	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ''
		}
	}
})

// create apollo client
const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
})


// routes component
const Root = ({ session, refetch }) => (
	<BrowserRouter>
		<Fragment>
			<Navbar session={session} />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/signin" render={() => <Signin refetch={refetch}/>} />
				<Route path="/signup" render={() => <Signup refetch={refetch}/>} />
				<Route path="/story/:id" component={StoryPage}/>
				<Route path="/user/:username" component={StoriesByUsername} />
				<Route path="/category/:category" component={StoriesByCategory} />
				<Route path="/add-story" render={() => <AddStory session={session} />} />
				<Route path="/profile" render={() => <UserProfile session={session} />} />
				<Route path="/search" component={SearchStory} />
			</Switch>
		</Fragment>
	</BrowserRouter>
)


const RootWithSession = withSession(Root)




ReactDOM.render(
	<ApolloProvider client={client}>
		<RootWithSession />
	</ApolloProvider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
