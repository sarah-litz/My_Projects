import React from 'react';
import Button from 'react-bootstrap/Button'; 
import './Login.css';
import 'bootstrap/dist/css/bootstrap.css';
// *note: put any other imports below so that CSS from your components takes precedence over default styles.





function Login() {   //          REACT COMPONENT : LOGIN PAGE 

    
    function validateInput() { //          VALIDATEINPUT() called from RETURN() function below
        /*  Function Description: triggered by onClick event. When user clicks "sign in" this checks to make sure the user entered valid values into both the email and password fields. */

        //  Initialize Variables    

        document.getElementById("error-message")!.innerText = ""; //empty error message from any past messages

        var emailAddressRX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;  //var for regex to validate email
        var minLength = 6; //var for regex to validate password;  check minimum 6 characters    //(note for sarah) var lowerCaseLetters = /[a-z]/g; // regex for lowerCaseLetters, g=global  
                
        var emailInput = (document.getElementById("email") as HTMLInputElement).value; 
        var passwordInput = (document.getElementById("inputPassword") as HTMLInputElement).value; 
        
        //   Email Validation:

        if (emailInput=="") { //empty email field 
            document.getElementById("error-message")!.innerText = "Please enter your email. \n"; 
        } 

        else if (!emailInput.match(emailAddressRX)) {  //entered an invalid email
            document.getElementById("error-message")!.innerText = "Please enter a valid email. \n"; 
        }


        //   Password Validation: 
        
        if (passwordInput=="") { //empty pswd field    
            document.getElementById("error-message")!.innerText += "Please enter a password."; 
        } 

        else if (passwordInput.length < minLength) { //entered an invalid pswrd field 
            document.getElementById("error-message")!.innerText += "Please enter a password containing at least 6 characters."; 
        }

        /*-----------------  

        if (emailInput is valid)
                backend stuff to make sure that the user entered the correct password that is linked with their email. 
                
        -------------------*/

        //   Returns True if there were no errors found in email/password input fields, else returns False

        if (  document.getElementById("error-message")!.innerText == "" ) { 
            return true; 
        } else { 
            return false; 
        }
    }
  
/*Checklist
    1. visual stuff in general
    2. add forgot password button
    3. set up for back end stuff 
    (done) 4. set up for whereto next when signin/register get clicked (onclick event) 
    5. remember my password button 
    6. password requirements 
    7. edge cases (not an email, wrong password, etc.)

    Later: 
*/ 
    
    return(  //              HTML (always goes inside of return statement)
        
        //      USERNAME AND PASSWORD BOXES
        <div className="mycard card col-12 col-lg-4 login-card mt-2 hv-center">
            <form> 
                <div className="form-group text-center">
                    <h3>Welcome Back!</h3>
                        <label>Sign in below to access your Bed Buddy account.</label>
                            <input type="email" 
                                className="form-control" 
                                id="email" 
                                aria-describedby="emailHelp" 
                                placeholder="Enter email"
                            />
                            <label  htmlFor = "inputPassword" className="sr-only">Password</label>
                            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required></input>
                </div> 

                <label id="error-message" style={{color:"red"}}> 
                </label>
                
                <button onClick={validateInput} className="button btn btn-md btn-primary" type="submit">Sign in</button>
                &nbsp; 
                <br></br>
  	            <a className="button btn btn-sm btn-primary" href="#">Create Account</a>
                
            </form>
        </div>  
        //      end username and password boxes      
    )
}

export default Login; 
