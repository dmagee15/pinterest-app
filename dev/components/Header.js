import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, withRouter, Route, Switch, Link, IndexRoute, Redirect} from 'react-router-dom';
import ReactRedux, {connect, Provider} from 'react-redux';
import Redux, {createStore, bindActionCreators} from 'redux';
import './../css/Header.css';

class Header extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
        searchInput: '',
        submitTerm: ''
    }
    }
    handleSearchInputChange = (event) => {
            this.setState({
            searchInput: event.target.value
            });
    }
    handleSearchKeyPress = (event) => {
        if(event.key=='Enter'){
            this.submitSearch();
        }
    }
    submitSearch = () => {
        this.setState({submitTerm:this.state.searchInput,searchInput:''}, function(){
            this.props.searchSubmitHandler(this.state.submitTerm);
        });

    }
   render(){

        return (
           <div id="header" className="headerContainer">
            <HomeButton float='left' text='Home' store={this.props.store} changeWindowState={this.props.changeWindowState} searchSubmitHandler={this.props.searchSubmitHandler}/>
            <input type="text" placeholder="Search Images..." onChange={this.handleSearchInputChange} onKeyPress={this.handleSearchKeyPress} value={this.state.searchInput} className="searchInputStyle" />
            <button className="searchButtonStyle"><img className="searchIconStyle" src="/output/iconmonstr-magnifier-6-48 (1).png" onClick={this.submitSearch}/></button>
            {(this.props.store.user.authenticated==true)?(
            <div style={{display:'inline-block', float:'right'}}>
                <LogoutButton float='right' store={this.props.store}/>
                <PersonalButton float='right' text={this.props.store.user.username} store={this.props.store} changeWindowState={this.props.changeWindowState}/>
            </div>
            ):(
                <HoverButton float='right' text='Login' address="/"/>
            )}
          </div>
          ); 
					
   }
      
   
}

class HoverButton extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
        hover: false
        };
    }
    getInitialState = () => {
        return {hover: false};
    }
    
    mouseOver = () => {
        this.setState({hover: true});
    }
    
    mouseOut = () => {
        this.setState({hover: false});
    }
    
    
    
    render() {
        
        var hoverButtonStyle = {
		    height: 50,
		    color: 'black',
		    float: this.props.float,
		    background: this.state.hover?'lightblue':'none',
            border:'none',
            margin: '0px 35px 0px 35px',
            fontFamily: 'Arial Black'
		};
    
        return(
            <Link to={this.props.address}><button style={hoverButtonStyle} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>{this.props.text}</button></Link>
        );
    }
}

class PersonalButton extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
        hover: false
        };
    }
    getInitialState = () => {
        return {hover: false};
    }
    
    mouseOver = () => {
        this.setState({hover: true});
    }
    
    mouseOut = () => {
        this.setState({hover: false});
    }
    
    
    
    render() {
        
        var hoverButtonStyle = {
		    height: 50,
		    color: 'darkslateblue',
		    float: this.props.float,
		    background: this.state.hover?'lightblue':'none',
            border:'none',
            margin: '0px 35px 0px 35px'
		};
        var iconStyle = {
	    height: 20,
	    width: 20,
	    margin: '0px 10px 0px 0px',
	    verticalAlign: 'middle'
	    };
	    var buttonTextStyle = {
	        display:'inline-block',
	        fontFamily: 'Arial Black'
	    }
        return(
            <button style={hoverButtonStyle} onClick={() => {this.props.changeWindowState(this.props.store.user.username)}} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}><img style={iconStyle} src="/output/iconmonstr-user-5-48.png" />
            <p style={buttonTextStyle}>{this.props.text}</p>
            </button>
        );
    }
}

class HomeButton extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
        hover: false
        };
    }
    getInitialState = () => {
        return {hover: false};
    }
    
    mouseOver = () => {
        this.setState({hover: true});
    }
    
    mouseOut = () => {
        this.setState({hover: false});
    }
    
    
    
    render() {
        
        var hoverButtonStyle = {
		    height: 50,
		    color: 'darkslateblue',
		    float: this.props.float,
		    background: this.state.hover?'lightblue':'none',
            border:'none',
            margin: '0px 35px 0px 35px'
		};
        var iconStyle = {
	    height: 20,
	    width: 20,
	    margin: '0px 10px 0px 0px',
	    verticalAlign: 'middle'
	    };
	    var buttonTextStyle = {
	        display:'inline-block',
	        fontFamily: 'Arial Black'
	    }
        return(
            <button style={hoverButtonStyle} onClick={() => {this.props.changeWindowState(''); this.props.searchSubmitHandler('');}} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
            <p style={buttonTextStyle}>{this.props.text}</p>
            </button>
        );
    }
}

class LogoutButton extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
        hover: false
        };
    }
    getInitialState = () => {
        return {hover: false};
    }
    
    mouseOver = () => {
        this.setState({hover: true});
    }
    
    mouseOut = () => {
        this.setState({hover: false});
    }
    logout = (history) => {
        fetch('/logout', {
        method: 'GET',
        credentials: 'include'
        }).then(() => {
            this.props.store.logoutUser();
            history.push('/main');
        })
    }
    
    
    render() {
        
        var hoverButtonStyle = {
		    height: 50,
		    color: 'black',
		    float: this.props.float,
		    background: this.state.hover?'lightblue':'none',
            border:'none',
            margin: '0px 20px 0px 20px'
		};
    
        return(
            <Route render={({ history}) => (
                <button style={hoverButtonStyle} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={() => this.logout(history)}>Logout</button>
            )} />
        );
    }
}

export default Header