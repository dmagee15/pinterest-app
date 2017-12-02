import React from "react";
import ReactDOM from "react-dom";

class Home extends React.Component{
    constructor(props) {
    super(props);
    }
    
   render(){

            return (
               <div>
                    <HomeMain/>
               </div>
          ); 
					
   }
      
   
}

class HomeMain extends React.Component{
    constructor(props) {
    super(props);
    }
    
   render(){
        var blackBack = {
                padding:0,
				margin:0,
				minWidth: '100%',
				height: '100vh',
				backgroundColor: 'black',
				overflow: 'hidden'
        };
        var divStyle = {
					padding:0,
					margin:0,
					minWidth: '100%',
					height: '100vh',
					backgroundImage:'url(/output/luca-zanon-26595.jpg)',
					backgroundPosition: 'center center',
					backgroundSize: 'cover',
					backgroundAttachment: 'fixed',
					filter: 'blur(5px)',
					overflow: 'hidden'
					};
            return (
                <div>
                <div style={blackBack}>
                    <div style={divStyle}>
                    </div>
                </div>
                <Welcome />
                </div>
          ); 
					
   }
      
   
}

class Welcome extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
        usernameInput: '',
        passwordInput: '',
        loginForm: true,
        usernameSignupInput: '',
        passwordSignupInput: '',
        emailSignupInput: ''
        }
    }
    handleUsernameChange = (event) => {
        this.setState({
            usernameInput: event.target.value
        });
    }
    handlePasswordChange = (event) => {
        this.setState({
            passwordInput: event.target.value
        });
    }
    handleUsernameSignupChange = (event) => {
        this.setState({
            usernameSignupInput: event.target.value
        });
    }
    handlePasswordSignupChange = (event) => {
        this.setState({
            passwordSignupInput: event.target.value
        });
    }
    handleEmailSignupChange = (event) => {
        this.setState({
            emailSignupInput: event.target.value
        });
    }
    handleLoginButton = () => {
        console.log('handleloginbutton');
        if(this.state.loginForm==false){
            this.setState({loginForm: true})
        }
    }
    handleSignupButton = () => {
        console.log('handlesignupbutton');
        if(this.state.loginForm==true){
            this.setState({loginForm: false})
        }
    }
    render(){

    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      width: 450,
      height: 340,
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
		margin: "25px 0 0 0",
		width: '70%',
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
    var guestpStyle = {
        display:'inline-block',
        fontFamily: 'Arial',
        fontSize: 16,
        fontWeight: 0,
        marginLeft: 30
    };
    var guestStyle = {
        color: '#56D0FF',
        fontSize: 18,
        fontWeight: 900,
        fontFamily: 'Arial Black'
    };
    var guestDivStyle = {
        textAlign:'left'
    };
    const divStyle = {
      backgroundColor: 'gray',
      width: '100%',
      height: 50,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5
    };
    var loginMenuButton = {
        border: 'none',
        backgroundColor: '#2CB7FF',
        width: '50%',
        height: 50,
        borderTopLeftRadius: 5,
        display: 'inline-block',
        textAlign: 'center'
    };
    var inactiveLoginMenuButton = {
        border: 'none',
        backgroundColor: '#B8E7FF',
        width: '50%',
        height: 50,
        borderTopLeftRadius: 5,
        display: 'inline-block',
        textAlign: 'center'
    };
    var signUpMenuButton = {
        border: 'none',
        backgroundColor: '#B8E7FF',
        width: '50%',
        height: 50,
        display: 'inline-block',
        borderTopRightRadius: 5,
        textAlign:'center'
    };
    var activeSignupMenuButton = {
        border: 'none',
        backgroundColor: '#2CB7FF',
        width: '50%',
        height: 50,
        display: 'inline-block',
        borderTopRightRadius: 5,
        textAlign:'center'
    };
    var activeButtonTextStyle = {
        fontSize: 25,
        fontFamily: 'Arial Black',
        color: 'white',
        fontWeight: 900,
        margin: 0,
        padding: '5px 0px 0px 0px'
    };
    var inactiveButtonTextStyle = {
        fontSize: 25,
        fontFamily: 'Arial Black',
        color: '#E9F8FF',
        fontWeight: 900,
        margin: 0,
        padding: '5px 0px 0px 0px'
    };
    if(this.state.loginForm){
        return (
            <div className="modal" style={modalStyle}>
                    <div style={divStyle}>
                    <button style={loginMenuButton} onClick={this.handleLoginButton}>
                        <h1 style={activeButtonTextStyle}>Log In</h1>
                    </button>
                    <button style={signUpMenuButton} onClick={this.handleSignupButton}>
                        <h1 style={inactiveButtonTextStyle}>Sign Up</h1>
                    </button>
                    </div>
                    <div>
                        <div style={iconDivStyle}>
                            <img style={iconStyle} src="/output/iconmonstr-user-5-48.png" />
                        </div>
                        <input style={inputStyle} type="text" placeholder="Username" value={this.state.usernameInput} onChange={this.handleUsernameChange}/>
                    </div>
                    <div>
                        <div style={iconDivStyle}>
                            <img style={iconStyle} src="/output/iconmonstr-lock-3-48.png" />
                        </div>
                        <input style={inputStyle} type="text" placeholder="Password" value={this.state.passwordInput} onChange={this.handlePasswordChange}/>
                    </div>
                    <div style={loginButtonDiv}>
                        <button style={loginButtonStyle}>Login</button>
                        <button style={twitterButtonStyle}>Login with Twitter</button>
                    </div>
                    <div style={guestDivStyle}>
                    <hr style={hrStyle}/>
                    <p style={guestpStyle}>Or browse images as a <span style={guestStyle}>Guest</span></p>
                    </div>
            </div>

            );
    }
    else{
        return (
            <div className="modal" style={modalStyle}>
                    <div style={divStyle}>
                    <button style={inactiveLoginMenuButton} onClick={this.handleLoginButton}>
                        <h1 style={inactiveButtonTextStyle}>Log In</h1>
                    </button>
                    <button style={activeSignupMenuButton} onClick={this.handleSignupButton}>
                        <h1 style={activeButtonTextStyle}>Sign Up</h1>
                    </button>
                    </div>
                    <div>
                        <div style={iconDivStyle}>
                            <img style={iconStyle} src="/output/iconmonstr-user-5-48.png" />
                        </div>
                        <input style={inputStyle} type="text" placeholder="Username" value={this.state.usernameSignupInput} onChange={this.handleUsernameSignupChange}/>
                    </div>
                    <div>
                        <div style={iconDivStyle}>
                            <img style={iconStyle} src="/output/iconmonstr-lock-3-48.png" />
                        </div>
                        <input style={inputStyle} type="text" placeholder="Password" value={this.state.passwordSignupInput} onChange={this.handlePasswordSignupChange}/>
                    </div>
                    <div>
                        <div style={iconDivStyle}>
                            <img style={iconStyle} src="/output/iconmonstr-email-1-48.png" />
                        </div>
                        <input style={inputStyle} type="text" placeholder="Email" value={this.state.emailSignupInput} onChange={this.handleEmailSignupChange}/>
                    </div>
                    <div style={loginButtonDiv}>
                        <button style={loginButtonStyle}>Sign Up</button>
                    </div>
            </div>

            );
    }

    }
   
}

class LoginSignup extends React.Component{
    constructor(props) {
    super(props);
    }
    
    render(){

    const divStyle = {
      backgroundColor: 'gray',
      width: '100%',
      height: 50,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5
    };
    var loginMenuButton = {
        border: 'none',
        backgroundColor: '#2CB7FF',
        width: '50%',
        height: 50,
        borderTopLeftRadius: 5,
        display: 'inline-block',
        textAlign: 'center'
    };
    var inactiveLoginMenuButton = {
        border: 'none',
        backgroundColor: '#B8E7FF',
        width: '50%',
        height: 50,
        borderTopLeftRadius: 5,
        display: 'inline-block',
        textAlign: 'center'
    };
    var signUpMenuButton = {
        border: 'none',
        backgroundColor: '#B8E7FF',
        width: '50%',
        height: 50,
        display: 'inline-block',
        borderTopRightRadius: 5,
        textAlign:'center'
    };
    var activeSignupMenuButton = {
        border: 'none',
        backgroundColor: '#2CB7FF',
        width: '50%',
        height: 50,
        display: 'inline-block',
        borderTopRightRadius: 5,
        textAlign:'center'
    };
    var activeButtonTextStyle = {
        fontSize: 25,
        fontFamily: 'Arial Black',
        color: 'white',
        fontWeight: 900,
        margin: 0,
        padding: '5px 0px 0px 0px'
    };
    var inactiveButtonTextStyle = {
        fontSize: 25,
        fontFamily: 'Arial Black',
        color: '#E9F8FF',
        fontWeight: 900,
        margin: 0,
        padding: '5px 0px 0px 0px'
    };
    if(this.props.buttonState==true){
        return (
                <div style={divStyle}>
                    <button style={loginMenuButton} onClick={this.props.handleLoginButton}>
                        <h1 style={activeButtonTextStyle}>Log In</h1>
                    </button>
                    <button style={signUpMenuButton} onClick={this.props.handleSignupButton}>
                        <h1 style={inactiveButtonTextStyle}>Sign Up</h1>
                    </button>
                </div>
            );
    }
    else{
        return (
                <div style={divStyle}>
                    <button style={inactiveLoginMenuButton} onClick={this.props.handleLoginButton}>
                        <h1 style={inactiveButtonTextStyle}>Log In</h1>
                    </button>
                    <button style={activeSignupMenuButton} onClick={this.props.handleSignupButton}>
                        <h1 style={activeButtonTextStyle}>Sign Up</h1>
                    </button>
                </div>
            );
        }
    }
   
}

class ProjectInfo extends React.Component{
    constructor(props) {
    super(props);
    }
    
   render(){
            var divStyle = {
                backgroundColor: 'gray',
                width:'100%',
                minHeight:300,
                textAlign:'center'
                };
            var infoBoxStyle = {
                width:300,
                display:'inline-block',
                margin: '50px 50px 0px 50px',
                verticalAlign: 'top',
                textAlign: 'left',
                padding: '0px 0px 20px 30px',
                borderLeft:'2px solid black'
            };
            var pStyle = {
                fontFamily: 'Arial',
                color: '#E0E0E0'
            };
            var hStyle = {
                color: 'white',
                marginBottom:0
            };
            return (
               <div style={divStyle}>
                    <div style={infoBoxStyle}>
                        <h1 style={hStyle}>Background</h1>
                        <p style={pStyle}>This book trading club app is a</p>
                        <p style={pStyle}>FreeCodeCamp full-stack project</p>
                    </div>
                    <div style={infoBoxStyle}>
                        <h1 style={hStyle}>Technologies</h1>
                        <p style={pStyle}>Front-end: React, React Router</p>
                        <p style={pStyle}>Back-end: Express.js, Mongoose</p>
                    </div>
                    <div style={infoBoxStyle}>
                        <h1 style={hStyle}>Author</h1>
                        <p style={pStyle}>David Magee is a web developer in</p>
                        <p style={pStyle}>Houston, TX</p>
                    </div>
               </div>
          ); 
					
   }
      
   
}

export default Home