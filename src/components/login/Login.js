import '../../App.css'
import { Modal, Button, Loader, Panel, PanelGroup, FlexboxGrid, ButtonToolbar, Col, Form, Notification } from 'rsuite';
import React, {useEffect, useState} from 'react';
import { SchemaModel, StringType } from "schema-typed"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux'
import { setNotifcation, resetNotification } from "../../reducer/NotificationReducer"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC52WQXzt2OXxI7m8UKHVMyA5nM39XAL08",
  authDomain: "ardent-e9b04.firebaseapp.com",
  projectId: "ardent-e9b04",
  storageBucket: "ardent-e9b04.appspot.com",
  messagingSenderId: "296117935772",
  appId: "1:296117935772:web:c532b91c650a99e8c95759",
  measurementId: "G-XJBF9LNV6J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


function Login() {    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false); 
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()

    // Sign In
    const [signInFormValue, setSignInFormValue] = React.useState({ 
        signin_email: "", 
        signin_password: ""
    }) 
    const signInFormRef = React.useRef() 
  
    // Model using schema model to validate 
    // the data taken in the form 
    const signInModel = SchemaModel({         
        signin_email: StringType() 
            .isEmail("Please enter valid email address") 
            .isRequired("This field is required"), 
        signin_password: StringType() 
            .isRequired("Enter password") 

    }) 

    const signInUserWithEmail = (e) => {        
        if (!signInFormRef.current.check()) { 
            console.error("Form error") 
            return
        }        
        setIsLoading(true)
        const auth = getAuth();
        signInWithEmailAndPassword(auth, e.signin_email, e.signin_password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            setIsLoading(false)
            dispatch(setNotifcation({notifyFlag: "success", notifyMessage: "Successful login!!"}))
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setIsLoading(false)
            dispatch(setNotifcation({notifyFlag: "error", notifyMessage: "Login failed!!"}))
        });    
    };

    // Sign up
    const [signUpFormValue, setSignUpFormValue] = React.useState({ 
        signup_fname: "", 
        signup_lname: "",
        signup_email: "",
        signup_password: "",
        signup_repassword:"",
    }) 
    const signUpFormRef = React.useRef() 
  
    // Model using schema model to validate 
    // the data taken in the form 
    const signUpModel = SchemaModel({     
        signup_fname: StringType()         
        .isRequired("This field is required"), 
        signup_lname: StringType()         
        .isRequired("This field is required"),         
        signup_email: StringType() 
            .isEmail("Please enter valid email address") 
            .isRequired("This field is required"), 
        signup_password: StringType() 
            .isRequired("Enter password"), 
        signup_repassword: StringType() 
            .isRequired("Enter password") 
    });
    
    const signUpUserWithEmail = (e) => {
        setIsLoading(true)
        if (!signUpFormRef.current.check()) { 
            console.error("Form error") 
            return
        }            
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, e.signup_email, e.signup_password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            setIsLoading(false)
            dispatch(setNotifcation({notifyFlag: "success", notifyMessage: "Successful registration!!"}))
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setIsLoading(false)
            dispatch(setNotifcation({notifyFlag: "error", notifyMessage: "Registration failed!!"}))
        });    
    };

    return (
        <div>
            <ButtonToolbar>
                <Button onClick={handleOpen}>Sign In/Up</Button>
            </ButtonToolbar>

            <Modal open={open} onClose={handleClose} size={'lg'}>
                <Modal.Header>
                    <Modal.Title>Authentication</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{'margin':'10px'}}>
                        <PanelGroup>
                            <FlexboxGrid justify="space-between">
                                <FlexboxGrid.Item as={Col} colspan={12}>
                                    <h2>Sign In</h2>
                                    {isLoading ? <Loader center content="Authenticating..." /> : ''}
                                    <Panel shaded>
                                        <Form ref={signInFormRef}
                                            model={signInModel}
                                            onSubmit={signInUserWithEmail}>
                                            <Form.Group controlId="signin_email">
                                                <Form.ControlLabel>Email</Form.ControlLabel>
                                                <Form.Control name="signin_email" type="email" />
                                                <Form.HelpText tooltip>Email is required</Form.HelpText>
                                            </Form.Group>
                                            <Form.Group controlId="signin_password">
                                                <Form.ControlLabel>Password</Form.ControlLabel>
                                                <Form.Control name="signin_password" type="password" autoComplete="off" />
                                            </Form.Group>
                                            <Form.Group>
                                            <ButtonToolbar>
                                                <Button appearance="primary" type="submit">Submit</Button>
                                                <Button appearance="default">Cancel</Button>
                                            </ButtonToolbar>
                                            </Form.Group>
                                        </Form>
                                    </Panel>
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item as={Col} colspan={12}>
                                    <h2>Sign Up</h2>
                                    {isLoading ? <Loader center content="Signing in..." /> : ''}
                                    <Panel shaded>
                                        <Form ref={signUpFormRef}
                                            model={signUpModel}
                                            onSubmit={signUpUserWithEmail}>
                                            <Form.Group controlId="signup_fname">
                                                <Form.ControlLabel>First Name</Form.ControlLabel>
                                                <Form.Control name="signup_fname"/>
                                                <Form.HelpText tooltip>Enter First Name</Form.HelpText>
                                            </Form.Group>
                                            <Form.Group controlId="signup_lname">
                                                <Form.ControlLabel>Last Name</Form.ControlLabel>
                                                <Form.Control name="signup_lname"/>
                                                <Form.HelpText tooltip>Enter Last Name</Form.HelpText>
                                            </Form.Group>                                            
                                            <Form.Group controlId="signup_email">
                                                <Form.ControlLabel>Email</Form.ControlLabel>
                                                <Form.Control name="signup_email" type="email" />
                                                <Form.HelpText tooltip>Email is required</Form.HelpText>
                                            </Form.Group>
                                            <Form.Group controlId="signup_password">
                                                <Form.ControlLabel>Password</Form.ControlLabel>
                                                <Form.Control name="signup_password" type="password" autoComplete="off" />
                                            </Form.Group>
                                            <Form.Group controlId="signup_repassword">
                                                <Form.ControlLabel>Re-enter Password</Form.ControlLabel>
                                                <Form.Control name="signup_repassword" type="password" autoComplete="off" />
                                                <Form.HelpText tooltip>Passwords should match</Form.HelpText>
                                            </Form.Group>                                            
                                            <Form.Group>
                                            <ButtonToolbar>
                                                <Button appearance="primary" type="submit">Submit</Button>
                                                <Button appearance="default">Cancel</Button>
                                            </ButtonToolbar>
                                            </Form.Group>
                                        </Form>                                        
                                    </Panel>  
                                </FlexboxGrid.Item>            
                            </FlexboxGrid>
                        </PanelGroup>
                    </div>
                </Modal.Body>                
                {/* <Modal.Footer>                    
                </Modal.Footer> */}
            </Modal>            
        </div>
    );
}

export default Login;