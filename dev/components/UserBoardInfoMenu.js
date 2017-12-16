import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, withRouter, Route, Switch, Link, IndexRoute, Redirect} from 'react-router-dom';
import ReactRedux, {connect, Provider} from 'react-redux';
import Redux, {createStore, bindActionCreators} from 'redux';

class UserBoardInfoMenu extends React.Component{
    constructor(props) {
    super(props);
    }
    
    render(){

        var divStyle = {
            display: 'inline-block',
            width: 270,
            margin: "10px 10px 10px 10px",
            padding:0,
            verticalAlign: 'top',
            overflow: 'hidden',
            overflowX: 'hidden',
            borderRadius: 5,
            textAlign: 'center'
        }
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
                <div style={divStyle} className="grid-item">
                    <h1 style={h1Style}>Browsing {this.props.user}'s Images</h1>
                </div>
                );
        }
        else if(this.props.store.user.username==this.props.user){
            return (
                <div style={divStyle} className="grid-item">
                    <h1 style={h1Style}>Browsing Your Images</h1>
                    <button style={addImageButtonStyle} onClick={this.props.addImageHandler}>Add Image</button>
                </div>
                );
        }
        else{
            return (
                <div style={divStyle} className="grid-item">
                    <h1 style={h1Style}>Browsing {this.props.user}'s Images</h1>
                </div>
                );
        }
        
    }
}

export default UserBoardInfoMenu