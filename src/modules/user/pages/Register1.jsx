import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
from 'mdb-react-ui-kit';
import networkOperations from '../../../shared/services/networkcall';

function Register1() {
  const navigate =useNavigate();
    const name = useRef();
    const pwd = useRef();
    const emailref = useRef();
    const phone = useRef();
    const [message, setMessage] = useState('');
    const doRegister=async()=>{
        const userInfo={
            'email':emailref.current.value,
            'password':pwd.current.value,
            'name':name.current.value,
            'phone':phone.current.value
        }
        try{
        const response = await networkOperations.postData("https://jmd-kwob.onrender.com/register",userInfo);
        setMessage(response.data.message);
        console.log("Response is ",response);
        navigate("/login")
    }
        catch(err){
            setMessage('Register Fail...');
            console.log("Error is ",err);
        }

    }
  return (
    <MDBContainer fluid className='p-4'>

      <MDBRow>

        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            The best Pizzas <br />
            <span className="text-primary">for you</span>
          </h1>

          <p className='px-3' style={{color: 'hsl(217, 10%, 50.8%)'}}>

          </p>

        </MDBCol>

        <MDBCol md='6'>

          <MDBCard className='my-5'>
            <MDBCardBody className='p-5'>

              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput ref = {name}wrapperClass='mb-4' label='name' id='form1' type='text'/>
                </MDBCol>

                <MDBCol col='6'>
                  <MDBInput ref = {phone}wrapperClass='mb-4' label='Phone No.' id='form1' type='text'/>
                </MDBCol>
              </MDBRow>

              <MDBInput ref = {emailref}wrapperClass='mb-4' label='Email' id='form1' type='email'/>
              <MDBInput ref={pwd} wrapperClass='mb-4' label='Password' id='form1' type='password'/>

              <div className='d-flex justify-content-center mb-4'>
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
              </div>

              <MDBBtn onClick = {doRegister} className='w-100 mb-4' size='md'>sign up</MDBBtn>

              <div className="text-center">
              <p>{message}</p>

                <p>or sign up with:</p>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='facebook-f' size="sm"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='twitter' size="sm"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='google' size="sm"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='github' size="sm"/>
                </MDBBtn>

              </div>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Register1;