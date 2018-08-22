import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, withRouter, Route, Switch, Link, IndexRoute, Redirect} from 'react-router-dom';
import ReactRedux, {connect, Provider} from 'react-redux';
import Redux, {createStore, bindActionCreators} from 'redux';
import ReactLoading from 'react-loading';
import './../css/AddImage.css';

class AddImage extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
        urlInput: '',
        titleInput: ''
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
        this.setState({urlInput: '',titleInput: '', loading: true});
    }

    render(){
    let loadingImage = (this.props.loadingImage)?(
    <div className="loadingDivStyle"><ReactLoading /></div>
    ):null;
        

    if(this.props.visible==false){
        return null;
    }

        return (
            <div className="addModal">
                    <div style={{width:'100%',textAlign:'right'}}>
                    <button className="addExitButton" onClick={this.props.addImageHandler}>X</button>
                    </div>
                    <div className="thumbnailStyle">
                        {
                            this.state.urlInput!='' &&
                            <img src={this.state.urlInput} onError={(event)=>event.target.setAttribute("src","/output/errorimage.png")} className="previewImgStyle" />
                        }
                        { loadingImage }
                    </div>
                    <div>
                        <input className="addInputStyle" type="text" placeholder="Url" value={this.state.urlInput} onChange={this.handleUrlChange}/>
                    </div>
                    <div>
                        <input className="addInputStyle" type="text" placeholder="Title" value={this.state.titleInput} onChange={this.handleTitleChange}/>
                    </div>
                    <div className="submitButtonContainer">
                        <button className="submitButtonStyle" onClick={this.handleSubmit}>Submit</button>
                    </div>
            </div>

            );

    }
   
}

export default AddImage