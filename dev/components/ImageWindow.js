import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, withRouter, Route, Switch, Link, IndexRoute, Redirect} from 'react-router-dom';
import ReactRedux, {connect, Provider} from 'react-redux';
import Redux, {createStore, bindActionCreators} from 'redux';
import './../css/ImageWindow.css';

class ImageWindow extends React.Component{
    constructor(props) {
    super(props);
    }
    
    render(){
    
    if(this.props.showImageWindow == null){
        return null;
    }
        
        return (
            <div>
            <div className="backdrop backdropStyle" onClick={this.props.closeWindow}>
                
            </div>
            
            <div className="modal imageModalStyle">
                   <img className="imgStyle" src={this.props.showImageWindow}/>
            </div>
            
            </div>
            );
    }
}

export default ImageWindow