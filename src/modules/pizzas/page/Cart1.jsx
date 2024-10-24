import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useContext } from "react";
import PizzaContext from "../../../context/PizzaContext";
import TotalContext from "../../../context/TotalContext";
import PizzaCardCart from "../components/PizzaCardCart";

export default function Cart1() {
  const loadscript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  const displayRazorpay = async (amount) => {
    const res = await loadscript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("You are Offline Failed to Load");
      return;
    }

    const options = {
      key: "rzp_test_BZlyVp26SWsi0K",
      currency: "INR",
      amount: amount * 100,
      name: "PizzaX",
      description: "Thanks for shopping with us",
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert("Payment is Successful");
      },
      prefill: {
        name: "PizzaX",
      },
      // if(response.razorpay_payment_id)
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  const { piz } = useContext(PizzaContext);
  var { total, setTotal, quantity } = useContext(TotalContext);
  const shipping = 5;
  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol size="12">
            <MDBCard
              className="card-registration card-registration-2"
              style={{ borderRadius: "15px" }}
            >
              <MDBCardBody className="p-0">
                <MDBRow className="g-0">
                  <MDBCol lg="8">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <MDBTypography
                          tag="h1"
                          className="fw-bold mb-0 text-black"
                        >
                          Shopping Cart
                        </MDBTypography>
                        <MDBTypography className="mb-0 text-muted">
                          {quantity} items
                        </MDBTypography>
                      </div>
                      {piz.map((pizza) => {
                        return (
                          <>
                            <PizzaCardCart key={pizza.id} pizzas={pizza} />
                            <br></br>
                          </>
                        );
                      })}

                      <hr className="my-4" />
                    </div>
                  </MDBCol>
                  <MDBCol lg="4" className="bg-grey">
                    <div className="p-5">
                      <MDBTypography
                        tag="h3"
                        className="fw-bold mb-5 mt-2 pt-1"
                      >
                        Summary
                      </MDBTypography>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-4">
                        <MDBTypography tag="h5" className="text-uppercase">
                          items: {quantity}
                        </MDBTypography>
                        <MDBTypography tag="h5">
                          Rs.{total.toFixed(2)}
                        </MDBTypography>
                      </div>

                      <MDBTypography tag="h5" className="text-uppercase mb-3">
                        Shipping
                      </MDBTypography>

                      <div className="mb-4 pb-2">
                        <select
                          className="select p-2 rounded bg-grey"
                          style={{ width: "100%" }}
                        >
                          <option value="1">
                            Standard-Delivery- {shipping}
                          </option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                          <option value="4">Four</option>
                        </select>
                      </div>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-5">
                        <MDBTypography tag="h5" className="text-uppercase">
                          Total price
                        </MDBTypography>
                        <MDBTypography tag="h5">
                          Rs.{(total + shipping).toFixed(2)}
                        </MDBTypography>
                      </div>

                      <MDBBtn
                        color="dark"
                        block
                        size="lg"
                        onClick={() => displayRazorpay(total)}
                      >
                        Pay Now
                      </MDBBtn>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
