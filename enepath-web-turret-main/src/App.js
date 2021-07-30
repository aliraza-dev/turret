import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/Home/Home';
import Login from './components/LoginPage/LoginPage'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

// Redux;
import { Provider } from 'react-redux';
import store from './redux/store';
import { connectToSocket } from './redux/actions/stationActions';

// BASE URL for axios, auth and middleware will be here soon;
axios.defaults.baseURL = 'http://localhost:4000';

class App extends Component {
	constructor() {
		super();
        this.store = store;
    }

	componentDidMount() {
		this.store.dispatch(connectToSocket())
	}

	render() {
		return (
			<Provider store={this.store}>
				<div className="container">
					<Router>
						<Route path="/main" exact component={Home}/>
						<Route path="/" exact component={Login}/>
					</Router>
				</div>
			</Provider>
		);
	}
}


export default App;

