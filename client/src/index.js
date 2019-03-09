import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './index.css';
import Navbar from './components/Navbar'

import Home from './components/Home';
import Signin from './components/Auth/Signin'
import Signup from './components/Auth/Signup'

import * as serviceWorker from './serviceWorker';
const Root = () => (
	<BrowserRouter>
		<Fragment>
			<Navbar />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/signin" component={Signin} />
				<Route path="/signup" component={Signup} />
			</Switch>
		</Fragment>
	</BrowserRouter>
)







ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
