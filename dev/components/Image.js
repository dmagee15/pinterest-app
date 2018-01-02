import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, withRouter, Route, Switch, Link, IndexRoute, Redirect} from 'react-router-dom';
import ReactRedux, {connect, Provider} from 'react-redux';
import Redux, {createStore, bindActionCreators} from 'redux';
import AddImage from './AddImage.js';

class Image extends React.Component{
    constructor(props) {
    super(props);
    }
    
    render(){

        var thumbnailStyle = {
            minHeight: 150,
            flex: 1,
            width: '100%',
            display: 'inline-block',
            overflow: 'hidden',
            margin: 0,
            padding: 0,
            position: 'relative'
        }
        var titleStyle = {
            width:'100%',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            margin: 0,
            padding: 0,
            fontFamily: 'Arial',
            fontSize: 15
        };
        var titleContainerStyle = {
            width: '100%',
            textAlign: 'center'
        }
        var divStyle = {
            display: 'inline-block',
            width: 270,
            margin: "3px 3px 3px 3px",
            padding:0,
            verticalAlign: 'top',
            boxShadow: '1px 1px 0px 0px #888888',
            borderLeft: '1px solid #EDEDED',
            borderBottom: '1px solid #EDEDED',
            overflow: 'hidden',
            overflowX: 'hidden',
            borderRadius: 5
        }
        var imgStyle = {
            width: '100%',
            minHeight: 150,
            flex: 1,
            display:'inline-block'
        }
        var divContentStyle = {
            width: '100%',
            margin: 0,
            padding: 0,
        }
        var subtextStyle = {
            color: '#D8D8D8',
            margin: 0,
            padding: 0
        };
        var buttonDiv = {
            height: 70,
            width: '100%',
            margin: 0,
            padding: 0
        }

        var infoButtonStyle = {
            display: 'inline-block',
            backgroundColor: 'lightblue',
            color: 'black',
            height: 40,
            padding:'0px 8px 0px 8px',
            margin:0,
            border: 'none',
            margin: '15px 0 0 5px',
            fontFamily: 'Tahoma',
            fontSize: 18,
            fontWeight: 900
        };
        var searchButtonStyle = {
		    display:'inline-block',
		    margin: '5px 0px 0px 10px',
		    padding: 0,
		    height: 25,
		    border: 'none',
		    backgroundColor: 'white',
		    overflow: 'hidden',
		    fontFamily: 'Arial',
		    color: 'darkslateblue',
		    fontSize: 13
		};
		var searchIconStyle = {
		    height: 25,
		    width: 25,
		    display: 'inline-block',
		    margin: 'auto auto auto auto',
		    overflow: 'hidden'
		};
		var numPinsStyle = {
		    display:'inline-block',
		    fontSize: 15,
		    fontFamily: 'Tahoma',
		    verticalAlign: 'top',
		    margin: '5px 0 0 5px',
		}
        var pinSectionStyle = {
            display:'inline-block',
            float:'right',
            marginRight: 10
        };
        var imageButtonStyle = {
            border: 'none',
            margin: 0,
            padding: 0,
            display: 'inline-block',
            backgroundColor: 'white'
            
        }
        var button = null;
        if(this.props.store.user.authenticated==false){
            button = <div style={searchButtonStyle}><img style={searchIconStyle} src="/output/iconmonstr-pin-23-48.png"/></div>;
        }
        else if(this.props.image.pinusers.indexOf(this.props.store.user.username)==-1){
            button = <button onClick={() => {this.props.pinImageHandler(this.props.image._id)}} style={searchButtonStyle}><img style={searchIconStyle} src="/output/iconmonstr-pin-23-48.png"/></button>;
        }
        else{
            button = <button onClick={() => {this.props.pinImageHandler(this.props.image._id)}} style={searchButtonStyle}><img style={searchIconStyle} src="/output/iconmonstr-pin-23-48 (1).png"/></button>;
        }
            return (
                <div style={divStyle} className="grid-item">
                <div style={thumbnailStyle}>
                    <button style={imageButtonStyle} onClick={()=>{this.props.openImageWindow(this.props.image.url)}}>
                    <img src={this.props.image.url} onError={(event)=>event.target.setAttribute("src","/output/errorimage.png")} style={imgStyle} />
                    </button>
                </div>
                <div style={divContentStyle}>
                    <div style={titleContainerStyle}>
                    <h3 style={titleStyle}>{this.props.image.title}</h3>
                    </div>
                    <button style={searchButtonStyle} onClick={() => {this.props.changeWindowState(this.props.image.username)}}>{this.props.image.username}</button>

                    <div style={pinSectionStyle}>
                        {button}
                    <p style={numPinsStyle}>{this.props.image.pinusers.length}</p>
                    </div>
                </div>
            </div>
                );
        
    }
}

export default Image