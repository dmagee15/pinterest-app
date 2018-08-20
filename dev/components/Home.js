import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, withRouter, Route, Switch, Link, IndexRoute, Redirect} from 'react-router-dom';
import ReactRedux, {connect, Provider} from 'react-redux';
import Redux, {createStore, bindActionCreators} from 'redux';
import Welcome from './Welcome';
import './../css/Home.css';

class Home extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
        loginCheck: false
    }
    }
    
   render(){
            return (
                <div>
                <div className="blackBack">
                    <div className="backStyle">
                    </div>
                </div>
                <Welcome store={this.props.store}/>
                </div>
          ); 
					
   }
}

class ProjectInfo extends React.Component{
    constructor(props) {
    super(props);
    }
    
   render(){
            var divStyle = {
                backgroundColor: 'gray',
                width:'100%',
                minHeight:300,
                textAlign:'center'
                };
            var infoBoxStyle = {
                width:300,
                display:'inline-block',
                margin: '50px 50px 0px 50px',
                verticalAlign: 'top',
                textAlign: 'left',
                padding: '0px 0px 20px 30px',
                borderLeft:'2px solid black'
            };
            var pStyle = {
                fontFamily: 'Arial',
                color: '#E0E0E0'
            };
            var hStyle = {
                color: 'white',
                marginBottom:0
            };
            return (
               <div style={divStyle}>
                    <div style={infoBoxStyle}>
                        <h1 style={hStyle}>Background</h1>
                        <p style={pStyle}>This book trading club app is a</p>
                        <p style={pStyle}>FreeCodeCamp full-stack project</p>
                    </div>
                    <div style={infoBoxStyle}>
                        <h1 style={hStyle}>Technologies</h1>
                        <p style={pStyle}>Front-end: React, React Router</p>
                        <p style={pStyle}>Back-end: Express.js, Mongoose</p>
                    </div>
                    <div style={infoBoxStyle}>
                        <h1 style={hStyle}>Author</h1>
                        <p style={pStyle}>David Magee is a web developer in</p>
                        <p style={pStyle}>Houston, TX</p>
                    </div>
               </div>
          ); 
					
   }
      
   
}

export default Home