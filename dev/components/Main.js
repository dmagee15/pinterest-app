import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, withRouter, Route, Switch, Link, IndexRoute, Redirect} from 'react-router-dom';
import ReactRedux, {connect, Provider} from 'react-redux';
import Redux, {createStore, bindActionCreators} from 'redux';
import Header from './Header.js';
import ImageBoard from './ImageBoard.js';
import UserImageBoard from './UserImageBoard.js';

class Main extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
        userWindow: '',
    }
    }
    changeWindowState = (user) => {
        this.setState({userWindow: user});
    }
   render(){

            return (
               <div>
                    {
                        (this.state.userWindow=='')?(
                            <ImageBoard store={this.props.store} changeWindowState={this.changeWindowState}/>
                        ):(
                            <UserImageBoard store={this.props.store} user={this.state.userWindow} changeWindowState={this.changeWindowState}/>
                        )
                    }
               </div>
          ); 
					
   }
      
   
}


export default Main