import React from 'react'
import {
    MDBBtn,
    MDBCardImage,
    MDBCol,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
    } from "mdb-react-ui-kit";
import productOperations from '../services/product-operations';
import PizzaContext from '../../../context/PizzaContext';
import TotalContext from '../../../context/TotalContext';

const PizzaCardCart = ({pizzas}) => {
    const{piz,setPizzas} = React.useContext(PizzaContext);
    var {total,setTotal,quantity,setQuantity} = React.useContext(TotalContext);
    const addPizzaToCarts=()=>{
        pizzas.isAddedInCart = true;
        pizzas.quantity += 1;
        // setCartPizza(productOperations.getProductsInCart());
        setPizzas(productOperations.getProductsInCart());
        console.log("This is the context " +piz);
        total += parseFloat(pizzas.price);
        quantity += 1;
        setQuantity(quantity);
        setTotal(total)
    }
    const removeAll=()=>{
      quantity = quantity-pizzas.quantity;
      setQuantity(quantity);

      total -= parseFloat(pizzas.price*pizzas.quantity);
      setTotal(total);
      pizzas.quantity = 0;
      pizzas.isAddedInCart = false;
      setPizzas(productOperations.getProductsInCart());

    }
    const removePizzaFromCarts=()=>{
        if(pizzas.quantity >1){
            pizzas.quantity -= 1;
            quantity -= 1;
            total -= parseFloat(pizzas.price);
            if(total<0){setTotal(0);setQuantity(0)}
            else{setTotal(total);setQuantity(quantity);}
        }
        else{
            pizzas.quantity -= 1
            quantity -= 1;

            total -= parseFloat(pizzas.price);
            if(total<0){setTotal(0);setQuantity(0)}
            else{setTotal(total);setQuantity(quantity);}
            pizzas.isAddedInCart = false;}
        // setCartPizza(productOperations.getProductsInCart());
        setPizzas(productOperations.getProductsInCart());
    }
  return (
    <>
    <hr className="my-4" />
    
    <MDBRow className="mb-4 d-flex justify-content-between align-items-center">
      <MDBCol md="2" lg="2" xl="2">
        <MDBCardImage
          src={pizzas.url}
          fluid className="rounded-3" alt="Cotton T-shirt" />
      </MDBCol>
      <MDBCol md="3" lg="3" xl="3">
        <MDBTypography tag="h6" className="text-muted">
          {pizzas.name}
        </MDBTypography>
        <MDBTypography tag="h6" className="text-black mb-0">
          {pizzas.desc}
        </MDBTypography>
      </MDBCol>
      <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
        <MDBBtn color="link" className="px-2" onClick={removePizzaFromCarts}>
          <MDBIcon fas icon="minus" />
        </MDBBtn>

        {/* <MDBInput type="number" min="0" defaultValue={pizzas.quantity} size="sm" /> */}
        <MDBCol md="3" lg="2" xl="2" className="text-end">
        <MDBTypography tag="h6" className="mb-0">
         {pizzas.quantity}
        </MDBTypography>
      </MDBCol>

        <MDBBtn color="link" className="px-2" onClick={addPizzaToCarts}>
          <MDBIcon fas icon="plus" />
        </MDBBtn>
      </MDBCol>
      <MDBCol md="3" lg="2" xl="2" className="text-end">
        <MDBTypography tag="h6" className="mb-0">
         {(pizzas.price*pizzas.quantity).toFixed(2)}
        </MDBTypography>
      </MDBCol>
      <MDBCol md="1" lg="1" xl="1" className="text-end">

        <MDBBtn color="link" className="px-2" onClick={removeAll}>
        <MDBIcon fas icon="times" />
        </MDBBtn>

   
      </MDBCol>
    </MDBRow></>
  )
}

export default PizzaCardCart