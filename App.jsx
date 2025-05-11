import React, { Component } from 'react'
import './App.css';
import { BASEURL, callApi, setSession } from './Api';
class App extends Component {
  constructor()
  {
    super();
    this.userRegistration = this.userRegistration.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.signin = this.signin.bind(this);
  }
  showsignin(){
    let popup = document.getElementById("popup");
    let signin = document.getElementById("signin");
    let signup = document.getElementById("signup");
    let popupHeader = document.getElementById("popupHeader");
    popupHeader.innerHTML = "Login";
    signup.style.display = "none";
    signin.style.display = "block";
    popup.style.display = "block";

    username.value = "";
    password.value = "";
  }

showsignup(){
    let popup = document.getElementById("popup");
    let signin = document.getElementById("signin");
    let signup = document.getElementById("signup");
    let popupHeader = document.getElementById("popupHeader");
    popupHeader.innerHTML = "Create new account";
    signup.style.display = "block";
    signin.style.display = "none";
    popup.style.display = "block";

    let fullname = document.getElementById("fullname");
    let email = document.getElementById("email");
    let role = document.getElementById("role");
    let signuppassword = document.getElementById("signuppassword");
    let confirmpassword = document.getElementById("confirmpassword");
    fullname.value="";
    email.value="";
    role.value="";
    signuppassword.value="";
    confirmpassword.value="";


  }
  closeSignin(event){
    if(event.target.id === "popup"){
      let popup = document.getElementById("popup");
      popup.style.display= "none";

      

    }
    

  }
  userRegistration()
  {
    let fullname = document.getElementById("fullname");
    let email = document.getElementById("email");
    let role = document.getElementById("role");
    let signuppassword = document.getElementById("signuppassword");
    let confirmpassword = document.getElementById("confirmpassword");

    fullname.style.border="";
    email.style.border="";
    role.style.border="";
    signuppassword.style.border="";
    confirmpassword.style.border="";
    if(fullname.value=="")
    {
        fullname.style.border = "1px solid red";
        fullname.focus();
        return;
    }
    if(email.value=="")
    {
        email.style.border = "1px solid red";
        email.focus();
        return;
    }
    if(role.value=="")
    {
        role.style.border = "1px solid red";
        role.focus();
        return;
    }
    if(signuppassword.value=="")
      {
          signuppassword.style.border = "1px solid red";
          signuppassword.focus();
          return;
      }
      if(confirmpassword.value=="")
        {
            confirmpassword.style.border = "1px solid red";
            confirmpassword.focus();
            return;
        }

        if(signuppassword.value !== confirmpassword.value)
        {
          signuppassword.style.border = "1px solid red";
          signuppassword.focus();
          return;
        }


    var data = JSON.stringify({
        fullname : fullname.value,
        email : email.value,
        role : role.value,
        password :  signuppassword.value

    });
    callApi("POST", "http://localhost:8080/user/signup", data, this.getResponse)

  }
  getResponse(res)
  {
    let resp = res.split(':');
    alert(resp[1]);
    if(resp[0] === "200")
    {
      let signin = document.getElementById("signin");
      let signup = document.getElementById("signup");
      signup.style.display = "none";
      signin.style.display = "block";
    }
  }

forgotPassword()
  {
    username.style.border = "";
    if(username.value === "")
      {
        username.style.border = "1px solid red";
        username.focus()
        return;

      }

      let url ="http://localhost:8080/user/forgotpwd/" + username.value;
      callApi("GET", url, "", this.forgotPasswordResponse);
    

  }
  forgotPasswordResponse(res)
  {
    let data = res.split(':');
    if(data[0] === "200")
      responseDiv.innerHTML = `<br/><br/><label style='color:green'>${data[1]}</label>`;
      else
      responseDiv.innerHTML = `<br/><br/><label style='color:red'>${data[1]}</label>`;



  }
  signin()
  {
    username.style.border="";
    password.style.border="";
    responseDiv.innerHTML="";

    if(username.value === "")
    {
      username.style.border = "1px solid red";
      username.focus();
      return;
    }
    if(password.value === "")
    {
      password.style.border = "1px solid red";
      password.focus();
      return;
    }

    let data = JSON.stringify({
        email: username.value,
        password: password.value
    });

    callApi("POST", BASEURL + "user/signin", data, this.signinResponse);
  }
  signinResponse(res)
  {
    let rdata = res.split(':');
    if(rdata[0] === "200")
    {
      setSession("csrid", rdata[1], 1);
      window.location.replace("/dashboard");
    }
    else{
      responseDiv.innerHTML = `<br/><br/><label style="color:red">${rdata[1]}</label>`;
    }

  }


  render() {
    return (
      <div id="container">
        <div id='popup' onClick={this.closeSignin}>
          <div id='popupWindow'>
            <div id='popupHeader'>Login</div>
            <div id='signin'>
              <label className='usernameLabel'>User Name</label>
              <input type='text' id='username' />
              <label className='passwordLabel'>Password</label>
              <input type='password' id='password' />
              <div className='forgotPassword'>Forgot <label onClick={this.forgotPassword}>Password</label></div>
              <button className='signinButton' onClick={this.signin}>signin</button>
                <div className='div1' id='responseDiv' >
                <div className='div2'>
                  Don't Have an Account?
                  <label onClick={this.showsignup}>SIGN UP NOW</label>
                </div>
                </div>
                
                
            </div>
            <div id='signup'>
              <label>Full Name*</label>
              <input type='text' id='fullname' />
              <label>Email</label>
              <input type='text' id='email' />
              <label>Select Role*</label>
              <select id='role'>
                <option value=''></option>
                <option value='1'>Admin</option>
                <option value='2'>Viewer</option>
                <option value='3'>Artist</option>
              </select>
              <label>Password</label>
              <input type='password' id='signuppassword' />
              <label>Confirm Password</label>
              <input type='password' id='confirmpassword' />
              <button onClick={this.userRegistration}>Register</button>
              <div>Already Have an Account? <span onClick={this.showsignin}>SIGN IN</span></div>

            </div>
            
          </div>
        </div>
        

      </div>
    )
  }
}
export default App;