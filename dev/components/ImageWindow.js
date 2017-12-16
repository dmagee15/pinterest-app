import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, withRouter, Route, Switch, Link, IndexRoute, Redirect} from 'react-router-dom';
import ReactRedux, {connect, Provider} from 'react-redux';
import Redux, {createStore, bindActionCreators} from 'redux';

class ImageWindow extends React.Component{
    constructor(props) {
    super(props);
    }
    
    render(){
    
    if(this.props.showImageWindow == null){
        return null;
    }
    
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50,
      zIndex: 10
    };

    const modalStyle = {
      backgroundColor: 'black',
      borderRadius: 5,
      minWidth: 400,
      maxWidth: 650,
      height: 540,
      margin: 0,
      position: 'fixed',
      top: '45%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      zIndex: 100,
      borderRadius: 5
    };
    
    var contentStyle = {
        display:'inline-block',
        height:490,
        width: 295,
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        margin: 0,
        overflowY: 'auto'
    };
        var titleStyle = {
            display: 'inline-block',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            margin: '5px 0 0 15px',
            padding: '0 0 0 0',
            fontFamily: 'Arial Black',
            fontWeight: 900
        };
        var subtextStyle = {
            color: '#BDBDBD',
            margin: 0,
            padding: '0 0 10px 0',
            fontFamily: "Bookman"
        };
        var synopsisStyle = {
            color: '#D8D8D8',
            margin: 0,
            padding: 0
        }
        var subtitleStyle = {
            color: '#A5A5A5',
            fontWeight: 700,
            padding: 0,
            margin: 0
        }
        var modalHeaderStyle = {
            display: 'inline-block',
            backgroundColor: '#DFDFDF',
            height: 40,
            minWidth: 650
        }
        var imgStyle = {
            maxWidth: '100%',
            maxHeight: '100%',
            flex: 1,
            display:'inline-block',
            position: 'relative',
            top: '50%',
            transform: 'translateY(-50%)',
        }
        
        return (
            <div>
            <div className="backdrop" style={backdropStyle} onClick={this.props.closeWindow}>
                
            </div>
            
            <div className="modal" style={modalStyle}>
                   <img style={imgStyle} src={this.props.showImageWindow}/>
            </div>
            
            </div>
            );
    }
}

export default ImageWindow