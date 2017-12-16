import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, withRouter, Route, Switch, Link, IndexRoute, Redirect} from 'react-router-dom';
import ReactRedux, {connect, Provider} from 'react-redux';
import Redux, {createStore, bindActionCreators} from 'redux';

class AddImage extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
        urlInput: '',
        titleInput: '',
        }
    }
    handleUrlChange = (event) => {
        this.setState({
            urlInput: event.target.value
        });
    }
    handleTitleChange = (event) => {
        this.setState({
            titleInput: event.target.value
        });
    }
    handleSubmit = () => {
        this.props.addImageDataHandler(this.state.urlInput,this.state.titleInput);
        this.setState({urlInput: '',titleInput: ''});
    }

    render(){
        
    if(this.props.visible==false){
        return null;
    }

    const modalStyle = {
      backgroundColor: '#F7F7F7',
      borderRadius: 5,
      width: 450,
      height: 540,
      margin: 0,
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      zIndex: 100
    };
    var inputStyle = {
		padding:'0px 0px 0px 10px',
		margin: "15px 0 0 0",
		width: '80%',
		height:35,
		border: '1px solid gray',
		borderRadius: 2,
		fontSize: 20,
		display:'inline-block'
	};
	var iconDivStyle = {
	    display: 'inline-block',
	    height: 37,
	    width: 45,
	    backgroundColor: 'gray',
	    verticalAlign: 'bottom',
	    borderTopLeftRadius: 5,
	    borderBottomLeftRadius: 5,
	};
	var iconStyle = {
	    height: 25,
	    width: 25,
	    margin: 'auto',
	    marginTop: 5
	};
	var loginButtonDiv = {
	    height: 75,
	    width: '100%',
	    textAlign: 'left'
	};
    var loginButtonStyle = {
        display:'inline-block',
        height: 40,
        backgroundColor: '#56FF5B',
        margin: '25px 5px 0px 40px',
        padding: '5px 10px 5px 10px',
        fontSize: 18,
		fontFamily: 'Tahoma',
		border:'none',
		borderRadius: 5,
		boxShadow:'none',
		fontWeight: 900,
		color: 'white'
    };
    var twitterButtonStyle = {
        display:'inline-block',
        height: 40,
        backgroundColor: '#56D0FF',
        margin: '25px 5px 0px 10px',
        padding: '5px 10px 5px 10px',
        fontSize: 18,
		fontFamily: 'Tahoma',
		border:'none',
		borderRadius: 5,
		boxShadow:'none',
		fontWeight: 900,
		color: 'white'
    };
    var hrStyle = {
        width: '85%',
        borderColor: '#E4F8FF'
    };
    var thumbnailStyle = {
        width: '95%',
        height: 340,
        backgroundColor: '#E8E8E8',
        display: 'inline-block',
    }
    var buttonDivStyle = {
        display: 'inline-block',
        width: '100%',
        textAlign: 'center'
    }
    var imgStyle = {
            maxHeight: 340,
            flex: 1,
            display:'inline-block',
            position: 'relative',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '100%',
            border: 'none'
        }
    var exitButtonStyle ={
        display:'inline-block',
        border: 'none',
        padding: '0 5px 0 5px',
        margin: 0,
        background: 'none',
        fontWeight: 900,
    }
        return (
            <div className="modal" style={modalStyle}>
                    <div style={{width:'100%',textAlign:'right'}}>
                    <button style={exitButtonStyle} onClick={this.props.addImageHandler}>X</button>
                    </div>
                    <div style={thumbnailStyle}>
                        {
                            this.state.urlInput!='' &&
                            <img src={this.state.urlInput} onError={(event)=>event.target.setAttribute("src","/output/errorimage.png")} style={imgStyle}/>
                        }
                    </div>
                    <div>
                        <input style={inputStyle} type="text" placeholder="Url" value={this.state.urlInput} onChange={this.handleUrlChange}/>
                    </div>
                    <div>
                        <input style={inputStyle} type="text" placeholder="Title" value={this.state.titleInput} onChange={this.handleTitleChange}/>
                    </div>
                    <div style={buttonDivStyle}>
                        <button style={twitterButtonStyle} onClick={this.handleSubmit}>Submit</button>
                    </div>
            </div>

            );

    }
   
}

export default AddImage