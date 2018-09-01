import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, withRouter, Route, Switch, Link, IndexRoute, Redirect} from 'react-router-dom';
import ReactRedux, {connect, Provider} from 'react-redux';
import Redux, {createStore, bindActionCreators} from 'redux';
import Image from './Image.js';
import AddImage from './AddImage.js';
import BoardInfoMenu from './BoardInfoMenu.js';
import ImageWindow from './ImageWindow.js';
import UserBoardInfoMenu from './UserBoardInfoMenu.js';
import Header from './Header.js';
import './../css/ImageBoard.css';
import Masonry from 'react-masonry-css';

class ImageBoard extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
            addimage: false,
            imagesArray: [],
            searchSubmit: '',
            showImageWindow: null,
            loadingImage: false
        }
        fetch('/getimages', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
        body: JSON.stringify({"user":null,
        })
        }).then(function(data) {
            return data.json();
        }).then((j) =>{
            var imagesArray = j.slice();
            this.setState({imagesArray});

        });
    }
    closeImageWindow = () => {
        this.setState({showImageWindow: null});
    }
    openImageWindow = (url) => {
        this.setState({showImageWindow: url});
    }
    searchSubmitHandler = (term) => {
        this.setState({searchSubmit: term});
    }
    loadingImageHandler = (value) =>{
        this.setState({
            loadingImage: value
        });
    }
    pinImageHandler = (id) => {
        fetch('/pinimage', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
        body: JSON.stringify({"id":id, 'user':''
        })
        }).then(function(data) {
            return data.json();
        }).then((j) =>{
            var imagesArray = j.slice();
            this.setState({imagesArray});

        });
    }
    addImageDataHandler = (url, title) => {
        this.loadingImageHandler(true);
        fetch('/addimage', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
        body: JSON.stringify({"url":url,
            "title":title,
            "user": null
        })
        }).then(function(data) {
            return data.json();
        }).then((j) =>{
            this.addImageHandler();
            var imagesArray = j.slice();
            this.setState({imagesArray});

        }).catch((err) =>{
            this.addImageHandler();
        });
    }
    addImageHandler = () => {
        this.loadingImageHandler(false);
        this.setState({addimage: !this.state.addimage});
    }
   render(){
            const breakpointColumnsObj = {
                default: 6,
                1500: 5,
                1250: 4,
                1100: 3,
                700: 2
            };
            var searchArray = [];
            var length = this.state.imagesArray.length;
            var regex = new RegExp(this.state.searchSubmit,'i');
            for(var x=0;x<length;x++){
                if(regex.test(this.state.imagesArray[x].username)||regex.test(this.state.imagesArray[x].title)){
                    searchArray.push(this.state.imagesArray[x]);
                }
            }
            var images = searchArray.map((image, index) => 
		   <Image key={index} store={this.props.store} image={image} pinImageHandler={this.pinImageHandler} openImageWindow={this.openImageWindow} changeWindowState={this.props.changeWindowState}/>
		    );
		    var display = 
		        <div>
		            <BoardInfoMenu addImageHandler={this.addImageHandler} store={this.props.store}/>
		            {images}
                </div>;
            images.unshift(<BoardInfoMenu addImageHandler={this.addImageHandler} store={this.props.store}/>);
            
            var divStyle = {
                width: '100%',
                height: '100vh',
                paddingTop: 0
            }
            return (
                <div>
                <Header store={this.props.store} changeWindowState={this.props.changeWindowState} searchSubmitHandler={this.searchSubmitHandler}/>
               <div style={divStyle}>
                    <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
                >
                    {images}
                </Masonry>
                <AddImage visible={this.state.addimage} loadingImage={this.state.loadingImage} addImageHandler={this.addImageHandler} addImageDataHandler={this.addImageDataHandler}/>
                <ImageWindow showImageWindow={this.state.showImageWindow} closeWindow={this.closeImageWindow}/>
               </div>
               </div>
          ); 
					
   }
      
}

export default ImageBoard