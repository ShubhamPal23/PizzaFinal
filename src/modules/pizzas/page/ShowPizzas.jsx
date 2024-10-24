import React, { useState } from 'react'
import PizzaCard1 from '../components/PizzaCard1'
import { Toolbar } from '@mui/material'
import productOperations from '../services/product-operations'
import { useEffect } from 'react'
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import {
  MDBCol,
  MDBContainer,
  MDBRow
  } from "mdb-react-ui-kit";

const Show = () => {
  const[pizza,setPizza] = useState([]);
  const[dbpizza,setdbPizza] = useState([]);

  const loadPizzas=async()=>{
  const pizzas = await productOperations.loadProducts();
  const dbpizzas = await productOperations.loaddbProducts();
  console.log('Pizzas are ', dbpizza);
  setPizza(pizzas);
  setdbPizza(dbpizzas);
}
useEffect(()=>{
  loadPizzas();
},[]);//eslint-disable-line react-hooks/exhaustive-deps


  return (
    <>
    
        <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5 h-100">
    <br></br>
    <MDBRow className="justify-content-center align-items-center h-100">
    <MDBCol size="12">
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div" >
            MENU
          </Typography>
        </Toolbar>
      </AppBar>
      <hr className="my-4" />
    </Box>
        <div className = "row rowsp">
        {pizza.map(pizzas=>{
          return (<><PizzaCard1 key = {pizza.id} pizzas = {pizzas} /></>)}
      )}
      
        {dbpizza.map(pizzas=>{
          return (<><PizzaCard1 key = {pizza.id} pizzas = {pizzas}/></>)}
      )}

        </div>
        </MDBCol>

    </MDBRow></MDBContainer></section>

    </>
  )
}

export default Show
