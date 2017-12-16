import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, withRouter, Route, Switch, Link, IndexRoute, Redirect} from 'react-router-dom';
import ReactRedux, {connect, Provider} from 'react-redux';
import Redux, {createStore, bindActionCreators} from 'redux';

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
       var divStyle = {
					padding:0,
					width: '100%',
					minHeight: 50,
					backgroundColor:'#F7F7F7',
					overflow: 'hidden',
					position: 'fixed',
					zIndex: 1,
					top: 0
					};
		var loggedStyle = {
		    float: 'right',
		    color: 'slateblue',
		    display: 'inline-block',
		    margin: '12px 40px 0px 0px',
		    fontSize: 15,
		    fontFamily: 'Arial'
		};
		var spanStyle = {
		    fontSize: 20,
		    color: 'darkslateblue',
		    fontFamily: 'Bookman',
		    fontWeight: 900
		};
		var searchInputStyle = {
		    margin: '6px 0px 0px 0px',
		    paddingLeft: 10,
		    height: 30,
		    width: '50%',
		    display:'inline-block',
		    overflow: 'hidden',
		    verticalAlign: 'top'
		};
		var searchButtonStyle = {
		    display:'inline-block',
		    margin: '6px 0px 0px 0px',
		    padding: 0,
		    height: 36,
		    width: 40,
		    border: 'none',
		    backgroundColor: 'black',
		    overflow: 'hidden',
		    borderTopRightRadius: 4,
		    borderBottomRightRadius: 4
		};
		var searchIconStyle = {
		    height: 30,
		    width: 30,
		    display: 'inline-block',
		    margin: '3px auto auto auto',
		    overflow: 'hidden'
		}

        return (
           <div id="header" style={divStyle}>
            <HomeButton float='left' text='Home' store={this.props.store} changeWindowState={this.props.changeWindowState} searchSubmitHandler={this.props.searchSubmitHandler}/>
            <input type="text" placeholder="Search Images..." onChange={this.handleSearchInputChange} onKeyPress={this.handleSearchKeyPress} value={this.state.searchInput} style={searchInputStyle}/>
            <button style={searchButtonStyle}><img style={searchIconStyle} src="/output/iconmonstr-magnifier-6-48 (1).png" onClick={this.submitSearch}/></button>
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