import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, withRouter, Route, Switch, Link, IndexRoute, Redirect} from 'react-router-dom';
import ReactRedux, {connect, Provider} from 'react-redux';
import Redux, {createStore, bindActionCreators} from 'redux';
import Masonry from 'react-masonry-component';

class Main extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
        userWindow: '',
    }
    }
    changeWindowState = (user) => {
        this.setState({userWindow: user});
    }
   render(){

            return (
               <div>
                    {
                        (this.state.userWindow=='')?(
                            <ImageBoard store={this.props.store} changeWindowState={this.changeWindowState}/>
                        ):(
                            <UserImageBoard store={this.props.store} user={this.state.userWindow} changeWindowState={this.changeWindowState}/>
                        )
                    }
               </div>
          ); 
					
   }
      
   
}
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
    submitSearch = () => {
        console.log(this.state.searchInput);
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
            <HomeButton float='left' text='Home' store={this.props.store} changeWindowState={this.props.changeWindowState}/>
            <input type="text" placeholder="Search Images..." onChange={this.handleSearchInputChange} value={this.state.searchInput} style={searchInputStyle}/>
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
            <button style={hoverButtonStyle} onClick={() => {this.props.changeWindowState('')}} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
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

class ImageBoard extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
            addimage: false,
            imagesArray: [],
            searchSubmit: ''
        }
        fetch('/getimages', {
        method: 'GET',
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
        }).then(function(data) {
            return data.json();
        }).then((j) =>{
            console.log(j);
            var imagesArray = j.slice();
            this.setState({imagesArray});

        });
    }
    searchSubmitHandler = (term) => {
        this.setState({searchSubmit: term});
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
            console.log(j);
            var imagesArray = j.slice();
            this.setState({imagesArray});

        });
    }
    addImageDataHandler = (url, title) => {
        this.addImageHandler();
        fetch('/addimage', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
        body: JSON.stringify({"url":url,
            "title":title
        })
        }).then(function(data) {
            return data.json();
        }).then((j) =>{
            console.log(j);
            var imagesArray = j.slice();
            this.setState({imagesArray});

        });
    }
    addImageHandler = () => {
        this.setState({addimage: !this.state.addimage});
        console.log(this.state.searchSubmit);
    }
   render(){
            var searchArray = [];
            var length = this.state.imagesArray.length;
            var regex = new RegExp(this.state.searchSubmit);
            for(var x=0;x<length;x++){
                if(regex.test(this.state.imagesArray[x].username)||regex.test(this.state.imagesArray[x].title)){
                    searchArray.push(this.state.imagesArray[x]);
                }
            }
            var images = searchArray.map((image, index) => 
		   <Image key={index} store={this.props.store} image={image} pinImageHandler={this.pinImageHandler} changeWindowState={this.props.changeWindowState}/>
		    );
		    var display = 
		        <div>
		            <BoardInfoMenu addImageHandler={this.addImageHandler} store={this.props.store}/>
		            {images}
		        </div>;
            
            var divStyle = {
                width: '100%',
                height: '100vh',
                paddingTop: 60
            }
            return (
                <div>
                <Header store={this.props.store} changeWindowState={this.props.changeWindowState} searchSubmitHandler={this.searchSubmitHandler}/>
               <div style={divStyle}>
                    <Masonry
                className={'my-gallery-class'} // default ''
                elementType={'ul'} // default 'div'
                options={{itemSelector: '.grid-item',
                columnWidth: 290}} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                >
                    {display}
                </Masonry>
                <AddImage visible={this.state.addimage} addImageHandler={this.addImageHandler} addImageDataHandler={this.addImageDataHandler}/>
               </div>
               </div>
          ); 
					
   }
      
}
class UserImageBoard extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
            addimage: false,
            imagesArray: [],
            searchSubmit: ''
        }
        fetch('/getuserimages', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
        body: JSON.stringify({"user":this.props.user,
        })
        }).then(function(data) {
            return data.json();
        }).then((j) =>{
            console.log(j);
            var imagesArray = j.slice();
            this.setState({imagesArray});

        });
    }
    searchSubmitHandler = (term) => {
        this.setState({searchSubmit: term});
    }
    pinImageHandler = (id) => {
        fetch('/pinimage', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
        body: JSON.stringify({"id":id, "user":this.props.user
        })
        }).then(function(data) {
            return data.json();
        }).then((j) =>{
            console.log(j);
            var imagesArray = j.slice();
            this.setState({imagesArray});

        });
    }
    addImageDataHandler = (url, title) => {
        this.addImageHandler();
        fetch('/adduserimage', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
        body: JSON.stringify({"url":url,
            "title":title
        })
        }).then(function(data) {
            return data.json();
        }).then((j) =>{
            console.log(j);
            var imagesArray = j.slice();
            this.setState({imagesArray});

        });
    }
    addImageHandler = () => {
        this.setState({addimage: !this.state.addimage});
    }
   render(){
            var searchArray = [];
            var length = this.state.imagesArray.length;
            var regex = new RegExp(this.state.searchSubmit);
            for(var x=0;x<length;x++){
                if(regex.test(this.state.imagesArray[x].username)||regex.test(this.state.imagesArray[x].title)){
                    searchArray.push(this.state.imagesArray[x]);
                }
            }
            var images = searchArray.map((image, index) => 
		   <Image key={index} store={this.props.store} image={image} pinImageHandler={this.pinImageHandler} changeWindowState={this.props.changeWindowState}/>
		    );
		    var display = 
		        <div>
		            <UserBoardInfoMenu addImageHandler={this.addImageHandler} store={this.props.store} user={this.props.user} />
		            {images}
		        </div>;
            
            var divStyle = {
                width: '100%',
                height: '100vh',
                paddingTop: 60
            }
            return (
                <div>
                <Header store={this.props.store} changeWindowState={this.props.changeWindowState} searchSubmitHandler={this.searchSubmitHandler}/>
               <div style={divStyle}>
                    <Masonry
                className={'my-gallery-class'} // default ''
                elementType={'ul'} // default 'div'
                options={{itemSelector: '.grid-item',
                columnWidth: 290}} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                >
                    {display}
                </Masonry>
                <AddImage visible={this.state.addimage} addImageHandler={this.addImageHandler} addImageDataHandler={this.addImageDataHandler}/>
               </div>
               </div>
          ); 
					
   }
      
}
class AddImage extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
        urlInput: '',
        titleInput: '',
        }
    }

    createAccount = (history) => {
        
        fetch('/createnewuser', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
        body: JSON.stringify({"username":this.state.usernameSignupInput,
            "password":this.state.passwordSignupInput,
            "email":this.state.emailSignupInput
        })
        }).then(function(data) {
            return data.json();
        }).then((j) =>{
            if(Object.keys(j).length === 0){
                console.log('fail');
                this.setState({fail:true});
            }
            else{
            console.log('pushing to homepage');
            console.log(j);
            this.props.store.loginUser(j);
            console.log(this.props);
            history.push('/main');
            }
        });

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
            transform: 'translateY(-50%)'
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
                        <img src={this.state.urlInput} style={imgStyle}/>
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
            margin: "10px 10px 10px 10px",
            padding:0,
            verticalAlign: 'top',
            boxShadow: '1px 1px 0px 0px #888888',
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
                    <img src={this.props.image.url} onError={(event)=>event.target.setAttribute("src","/output/errorimage.png")} style={imgStyle} />
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
class BoardInfoMenu extends React.Component{
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
                    <h1 style={h1Style}>Browsing All Images</h1>
                </div>
                );
        }
        else{
            return (
                <div style={divStyle} className="grid-item">
                    <h1 style={h1Style}>Browsing All Images</h1>
                    <button style={addImageButtonStyle} onClick={this.props.addImageHandler}>Add Image</button>
                </div>
                );
        }
        
    }
}

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
                    <h1 style={h1Style}>Browsing All Images</h1>
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

export default Main