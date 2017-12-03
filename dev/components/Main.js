import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, withRouter, Route, Switch, Link, IndexRoute, Redirect} from 'react-router-dom';
import ReactRedux, {connect, Provider} from 'react-redux';
import Redux, {createStore, bindActionCreators} from 'redux';
import Masonry from 'react-masonry-component';

class Main extends React.Component{
    constructor(props) {
    super(props);
    }
    
   render(){

            return (
               <div>
                    <Header store={this.props.store}/>
                    <ImageBoard />
               </div>
          ); 
					
   }
      
   
}
class Header extends React.Component{
    constructor(props) {
    super(props);
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
            <HoverButton float='left' text='Home' address="/"/>
            <input type="text" placeholder="Search Images..." style={searchInputStyle}/>
            <button style={searchButtonStyle}><img style={searchIconStyle} src="/output/iconmonstr-magnifier-6-48 (1).png"/></button>
            {(this.props.store.user.authenticated==true)?(
            <div style={{display:'inline-block', float:'right'}}>
                <HoverButton float='right' text='Logout' address="login"/>
                <PersonalButton float='right' text={this.props.store.user.username} address="login"/>
            </div>
            ):(
                <HoverButton float='right' text='Login' address="login"/>
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
            <Link to={this.props.address}>
            
            <button style={hoverButtonStyle} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}><img style={iconStyle} src="/output/iconmonstr-user-5-48.png" />
            <p style={buttonTextStyle}>{this.props.text}</p></button></Link>
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
            history.push('/');
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
    }
    
   render(){
            var images =
                <div>
                    <BoardInfoMenu />
                    <Image url="http://s2.quickmeme.com/img/9b/9b813f1bbcc2f083e4961d02e857c5807c1a05d9ce27ffa51b16fea72de6c207.jpg"/>
                    <Image url="https://img.memecdn.com/you-cant-explain-that_o_275514.jpg"/>
                    <Image url="https://img.memecdn.com/you-cant-explain-that-my-first-meme_o_271120.jpg"/>
                    <Image url="http://i0.kym-cdn.com/photos/images/facebook/000/114/439/Ok-pinhead-where-did-God-come-from-I-cant-explain-that.jpg"/>
                    <Image url="http://i.kinja-img.com/gawker-media/image/upload/s--gv5IYfsE--/ju1emrk8qbjwulltom9w.jpg"/>
                    <Image url="https://img.memecdn.com/you-cant-explain-that_o_760684.jpg"/>
                    <Image url="http://i0.kym-cdn.com/photos/images/facebook/000/098/235/VWkZl.jpg"/>
                    <Image url="http://i0.kym-cdn.com/photos/images/newsfeed/000/098/234/qAgC2.jpg"/>
                    <Image url="http://i0.kym-cdn.com/photos/images/facebook/000/283/817/e3d.jpg"/>
                    <Image url="https://am22.akamaized.net/tms/cnt/uploads/2011/02/dollar-soda.jpeg"/>
                    <Image url="http://s2.quickmeme.com/img/9b/9b813f1bbcc2f083e4961d02e857c5807c1a05d9ce27ffa51b16fea72de6c207.jpg"/>
                    <Image url="https://img.memecdn.com/you-cant-explain-that_o_275514.jpg"/>
                    <Image url="https://img.memecdn.com/you-cant-explain-that-my-first-meme_o_271120.jpg"/>
                    <Image url="http://i0.kym-cdn.com/photos/images/facebook/000/114/439/Ok-pinhead-where-did-God-come-from-I-cant-explain-that.jpg"/>
                </div>;
            
            var divStyle = {
                width: '100%',
                height: '100vh',
                paddingTop: 60
            }
            return (
               <div style={divStyle}>
                    <Masonry
                className={'my-gallery-class'} // default ''
                elementType={'ul'} // default 'div'
                options={{itemSelector: '.grid-item',
                columnWidth: 290}} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                >
                    {images}
                </Masonry>
                <AddImage />
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

    render(){

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
        backgroundColor: 'red',
        display: 'inline-block',
        marginTop: 10
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
        return (
            <div className="modal" style={modalStyle}>
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
                        <button style={twitterButtonStyle}>Submit</button>
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
        var img2Style = {
            width: '100%',
            minHeight: 150,
            flex: 1,
            backgroundSize: 'cover',
            backgroundImage: "url('"+'http://s2.quickmeme.com/img/9b/9b813f1bbcc2f083e4961d02e857c5807c1a05d9ce27ffa51b16fea72de6c207.jpg'+"')",
            display:'inline-block'
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

            return (
                <div style={divStyle} className="grid-item">
                <div style={thumbnailStyle}>
                    <img src={this.props.url} style={imgStyle} />
                </div>
                <div style={divContentStyle}>
                    <div style={titleContainerStyle}>
                    <h3 style={titleStyle}>Title</h3>
                    </div>
                    <button style={searchButtonStyle}>KyleCal33</button>

                    <div style={pinSectionStyle}>
                    <button style={searchButtonStyle}><img style={searchIconStyle} src="/output/iconmonstr-pin-23-48.png"/></button>
                    <p style={numPinsStyle}>25</p>
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

            return (
                <div style={divStyle} className="grid-item">
                    <h1 style={h1Style}>Browsing All Images</h1>
                    <button style={addImageButtonStyle}>Add Image</button>
                </div>
                );
        
    }
}


export default Main