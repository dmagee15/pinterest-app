import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, withRouter, Route, Switch, Link, IndexRoute, Redirect} from 'react-router-dom';
import ReactRedux, {connect, Provider} from 'react-redux';
import Redux, {createStore, bindActionCreators} from 'redux';
import './../css/BoardInfoMenu.css';

class BoardInfoMenu extends React.Component{
    constructor(props) {
    super(props);
    }
    
    render(){

        var h1Style = {
            display:'inline-block',
            color: 'darkred',
            fontFamily: 'Tahoma',
            fontWeight: 900
        };
        var addImageButtonStyle = {
            display:'inline-block',
            height: 40,
            backgroundColor: '#56D0FF',
            margin: '5px 0px 0px 0px',
            padding: '5px 10px 5px 10px',
            fontSize: 18,
		    fontFamily: 'Tahoma',
		    border:'none',
		    borderRadius: 5,
		    boxShadow:'none',
		    fontWeight: 900,
		    color: 'white'
        };
        if(this.props.store.user.username==''){
            return (
                <div className="grid-item boardInfoMenu">
                    <h1 style={h1Style}>Browsing All Images</h1>
                </div>
                );
        }
        else{
            return (
                <div className="grid-item boardInfoMenu">
                    <h1 style={h1Style}>Browsing All Images</h1>
                    <button style={addImageButtonStyle} onClick={this.props.addImageHandler}>Add Image</button>
                </div>
                );
        }
        
    }
}

export default BoardInfoMenu