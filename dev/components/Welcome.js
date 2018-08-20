import React from 'react';
import { withRouter } from 'react-router-dom';
import './../css/Welcome.css';

class Welcome extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
        usernameInput: '',
        passwordInput: '',
        loginForm: true,
        usernameSignupInput: '',
        passwordSignupInput: '',
        emailSignupInput: '',
        loginFail: false,
        signupFail: false
        }
    }
    loginGuest = (history) => {

        history.push('/main');
    }
    loginTwitter = () => {
        fetch('/auth/twitter', {
        method: 'GET',
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
        }).then(function(data) {
            return data.json();
        }).then((j) =>{
            if(Object.keys(j).length === 0){
                this.setState({loginFail:true});
            }
            else{
                this.props.store.loginUser(j);
                this.props.history.push('/main');
            }

        });
    }

    loginAccount = () => {
        
        fetch('/login', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
        body: JSON.stringify({"username":this.state.usernameInput,
            "password":this.state.passwordInput
        })
        }).then(function(data) {
            return data.json();
        }).then((j) =>{
            if(Object.keys(j).length === 0){
                this.setState({loginFail:true});
            }
            else{
                this.props.store.loginUser(j);
                this.props.history.push('/main');
            }

        });

    }
    createAccount = () => {
        
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
                this.setState({signupFail:true});
            }
            else{
            this.props.store.loginUser(j);
            this.props.history.push('/main');
            }
        });

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
        if(this.state.loginForm==false){
            this.setState({loginForm: true})
        }
    }
    handleSignupButton = () => {
        if(this.state.loginForm==true){
            this.setState({loginForm: false})
        }
    }
    unauthenticatedbrowse = () => {
        this.props.history.push('/main');
    }
    render(){

    if(this.state.loginForm){
        return (
            <div className="modal" className="modalStyle">
                    <div className="buttonContainerStyle">
                    <button className="loginMenuButton" onClick={this.handleLoginButton}>
                        <h1 className="activeButtonTextStyle">Log In</h1>
                    </button>
                    <button className="signUpMenuButton" onClick={this.handleSignupButton}>
                        <h1 className="inactiveButtonTextStyle">Sign Up</h1>
                    </button>
                    </div>
                    <div>
                        <div className="errorDivStyle"></div>
                        <div className="iconDivStyle">
                            <img className="iconStyle" src="/output/iconmonstr-user-5-48.png" />
                        </div>
                        <input className="inputStyle" type="text" placeholder="Username" value={this.state.usernameInput} onChange={this.handleUsernameChange}/>
                    </div>
                    <div>
                        <div className="errorDivStyle">
                        {
                            this.state.loginFail==true &&
                            <p className="errorTextStyle">Username/password combination invalid</p>
                        }
                        </div>
                        <div className="iconDivStyle">
                            <img className="iconStyle" src="/output/iconmonstr-lock-3-48.png" />
                        </div>
                        <input className="inputStyle" type="text" type="password" placeholder="Password" value={this.state.passwordInput} onChange={this.handlePasswordChange}/>
                        <div className="errorDivStyle"></div>
                    </div>
                    <div className="loginButtonDiv">
                        <button className="loginButtonStyle" onClick={this.loginAccount}>Login</button> 
                        <a href='/twitterlogin'><div className="twitterButtonStyle"><p className="twitterButtonPStyle">Login with Twitter</p></div></a>
                    </div>
                    <div className="guestDivStyle">
                    <hr className="hrStyle"/>
                    <p className="guestpStyle">Or browse images as a </p>
                    <button className="guestStyle" onClick={this.unauthenticatedbrowse}>Guest</button>
                    </div>
            </div>

            );
    }
    else{
        return (
            <div className="modal" className="modalStyle">
                    <div className="buttonContainerStyle">
                    <button className="inactiveLoginMenuButton" onClick={this.handleLoginButton}>
                        <h1 className="inactiveButtonTextStyle">Log In</h1>
                    </button>
                    <button className="activeSignupMenuButton" onClick={this.handleSignupButton}>
                        <h1 className="activeButtonTextStyle">Sign Up</h1>
                    </button>
                    </div>
                    <div>
                        <div className="errorDivStyle"></div>
                        <div className="iconDivStyle">
                            <img className="iconStyle" src="/output/iconmonstr-user-5-48.png" />
                        </div>
                        <input className="inputStyle" type="text" placeholder="Username" value={this.state.usernameSignupInput} onChange={this.handleUsernameSignupChange}/>
                    </div>
                    <div>
                        <div className="errorDivStyle">
                        {
                            this.state.signupFail==true &&
                            <p className="errorTextStyle">Username already taken</p>
                        }
                        </div>
                        <div className="iconDivStyle">
                            <img className="iconStyle" src="/output/iconmonstr-lock-3-48.png" />
                        </div>
                        <input className="inputStyle" type="text" type="password" placeholder="Password" value={this.state.passwordSignupInput} onChange={this.handlePasswordSignupChange}/>
                    </div>
                    <div>
                        <div className="errorDivStyle"></div>
                        <div className="iconDivStyle">
                            <img className="iconStyle" src="/output/iconmonstr-email-1-48.png" />
                        </div>
                        <input className="inputStyle" type="text" placeholder="Email" value={this.state.emailSignupInput} onChange={this.handleEmailSignupChange}/>
                    </div>
                    <div className="errorDivStyle"></div>
                    <div className="loginButtonDiv">
                        <button className="loginButtonStyle" onClick={this.createAccount}>Sign Up</button>
                    </div>
            </div>

            );
    }
    
    }
   
}

export default withRouter(Welcome);