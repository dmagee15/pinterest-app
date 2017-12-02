console.log("Script started");

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, withRouter, Route, Switch, Link, IndexRoute, Redirect} from 'react-router-dom';
import ReactRedux, {connect, Provider} from 'react-redux';
import Redux, {createStore, bindActionCreators} from 'redux';
import Home from "./components/Home.js";
import Main from "./components/Main.js";
import Login from "./components/Login.js";
import Header from "./components/Header.js";
import Profile from "./components/Profile.js";
import AllBooks from "./components/AllBooks.js";

const ADD = 'ADD';

const initialState = {
    authenticated: false,
	username: '',
	email: ''
};

const loginUser = (user) => {
	return {
		type: 'LOGIN',
		user: user
	};
};

const logoutUser = () => {
	return {
		type: 'LOGOUT'
	};
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
        return Object.assign({}, state, {
        authenticated: true,
		username: action.user.username,
	    email: action.user.email,
    });
    case 'LOGOUT':
        return Object.assign({}, state, {
        authenticated: false,
		username: '',
	    email: '',
    });
    default:
      return state;
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => {
      dispatch(loginUser(user))
    },
    logoutUser: () => {
      dispatch(logoutUser())
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state
  }
}

const store = createStore(messageReducer);

// React:

class App extends React.Component{
    constructor(props) {
    super(props);
    }
   render(){
            console.log(this.props);
            return (
           <div>
            <Router>
            <div>
                <Route exact path='/' render={(props) => (
                    <Home store={this.props}/>
                )} />
                <Route exact path='/main' render={(props) => (
                    <Main store={this.props}/>
                )} />
                <Route exact path='/profile' render={(props) => (
                    <Profile store={this.props}/>
                )} />
                <Route exact path='/allbooks' render={(props) => (
                    <AllBooks store={this.props}/>
                )} />
                <Route exact path='/login' render={(props) => (
                    <Login store={this.props}/>
                )} />
            </div>
            </Router>
          </div>
          ); 
					
   }
      
   
}

const Container = connect(mapStateToProps, mapDispatchToProps)(App);

const AppWrapper = ({ store }) => (
  <Provider store={store}>
      <Container />
  </Provider>
);

ReactDOM.render(
        <AppWrapper store={store}/>,
    document.querySelector("#container")
    );
    
console.log("script ended");