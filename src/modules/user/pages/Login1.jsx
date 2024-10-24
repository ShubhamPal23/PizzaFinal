import React, { useEffect, useRef, useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import './login1.css';
import { useNavigate } from 'react-router-dom';
import networkOperations from '../../../shared/services/networkcall';

function Login1() {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');
    const pwd = useRef();
    const emailref = useRef();

    useEffect(() => {
        setTimeout(() => {
            console.log(user);
            if (user) {
                navigate(`/logg/${user}`);
            }
        }, 1000);
    }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

    const doLogin = async () => {
        const userInfo = {
            email: emailref.current.value,
            password: pwd.current.value
        };

        try {
            const response = await networkOperations.postData("https://jmd-kwob.onrender.com/login", userInfo);
            console.log("Response is", response);
            setMessage(response.data.message);

            if (response.data.name) {
                const userData = {
                    username: response.data.name,
                    email: response.data.email
                };

                // Store the user data in localStorage
                localStorage.setItem('user', JSON.stringify(userData));

                setUser(response.data.name);
                navigate(`/logg/${response.data.name}`);
                window.location.reload();
            }
        } catch (err) {
            setMessage('Invalid User id or password');
            console.log("Error is", err);
        }
    };

    return (
        <MDBContainer fluid className="p-3 my-5 h-custom">

            <MDBRow>
                <MDBCol col='10' md='6'>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
                </MDBCol>

                <MDBCol col='4' md='6'>
                    <div className="d-flex flex-row align-items-center justify-content-center">
                        <p className="lead fw-normal mb-0 me-3">Sign in with</p>

                        <MDBBtn floating size='md' tag='a' className='me-2'>
                            <MDBIcon fab icon='facebook-f' />
                        </MDBBtn>

                        <MDBBtn floating size='md' tag='a' className='me-2'>
                            <MDBIcon fab icon='twitter' />
                        </MDBBtn>

                        <MDBBtn floating size='md' tag='a' className='me-2'>
                            <MDBIcon fab icon='linkedin-in' />
                        </MDBBtn>
                    </div>

                    <div className="divider d-flex align-items-center my-4">
                        <p className="text-center fw-bold mx-3 mb-0">Or</p>
                    </div>

                    <MDBInput wrapperClass='mb-4' ref={emailref} label='Email address' id='formControlLg' type='email' size="lg" />
                    <MDBInput wrapperClass='mb-4' ref={pwd} label='Password' id='formControlLg' type='password' size="lg" />

                    <div className="d-flex justify-content-between mb-4">
                        <p>{message}</p>
                        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                        <a href="!#">Forgot password?</a>
                    </div>

                    <div className='text-center text-md-start mt-4 pt-2'>
                        <MDBBtn className="mb-0 px-5" onClick={doLogin} size='lg'>Login</MDBBtn>
                        <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="#!" className="link-danger">Register</a></p>
                    </div>
                </MDBCol>
            </MDBRow>

            <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
                <div className="text-white mb-3 mb-md-0">
                    Copyright © 2020. All rights reserved.
                </div>

                <div>
                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
                        <MDBIcon fab icon='facebook-f' size="md" />
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
                        <MDBIcon fab icon='twitter' size="md" />
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
                        <MDBIcon fab icon='google' size="md" />
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
                        <MDBIcon fab icon='linkedin-in' size="md" />
                    </MDBBtn>
                </div>
            </div>
        </MDBContainer>
    );
}

export default Login1;
