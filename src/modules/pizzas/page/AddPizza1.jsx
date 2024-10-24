import React, { useRef, useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
} from "mdb-react-ui-kit";
import networkOperations from "../../../shared/services/networkcall";

function AddPizza1() {
  const desc = useRef();
  const name = useRef();
  const idRef = useRef();
  const src = useRef();
  const price = useRef();
  const [message, setMessage] = useState("");
  const doRegister = async () => {
    const userInfo = {
      pizzaId: idRef.current.value,
      pizzaName: name.current.value,
      pizzaDesc: desc.current.value,
      pizzaSrc: src.current.value,
      pizzaPrice: price.current.value,
    };
    try {
      const response = await networkOperations.postData(
        "https://jmd-kwob.onrender.com/addpizza",
        userInfo
      );
      setMessage(response.data.message);
      console.log("Response is ", response);
    } catch (err) {
      setMessage("Register Fail...");
      console.log("Error is ", err);
    }
  };
  return (
    <MDBContainer fluid>
      <div
        className="p-5 bg-image"
        style={{
          backgroundImage:
            "url(https://mdbootstrap.com/img/new/textures/full/171.jpg)",
          height: "300px",
          marginTop:"30px"
        }}
      ></div>

      <MDBCard
        className="mx-5 mb-5 p-5 shadow-5"
        style={{
          marginTop: "-100px",
          background: "hsla(0, 0%, 100%, 0.8)",
          backdropFilter: "blur(30px)",
        }}
      >
        <MDBCardBody className="p-5 text-center">
          <h2 className="fw-bold mb-5">Add Pizza</h2>

          <MDBRow>
            <MDBCol col="6">
              <MDBInput
                wrapperClass="mb-4"
                ref={name}
                label="Pizza Name"
                id="form1"
                type="text"
              />
            </MDBCol>

            <MDBCol col="6">
              <MDBInput
                wrapperClass="mb-4"
                ref={desc}
                label="Description"
                id="form1"
                type="text"
              />
            </MDBCol>
          </MDBRow>
          <MDBInput
            wrapperClass="mb-4"
            ref={src}
            label="Image"
            id="form1"
            type="text"
          />
          <MDBInput
            wrapperClass="mb-4"
            ref={idRef}
            label="id"
            id="form1"
            type="email"
          />
          <MDBInput
            wrapperClass="mb-4"
            ref={price}
            label="Price"
            id="form1"
            type="password"
          />

          <MDBBtn onClick={doRegister} className="w-100 mb-4" size="md">
            Add Pizza
          </MDBBtn>

          <div className="text-center">
            <p>{message}</p>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default AddPizza1;
