import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import productOperations from '../services/product-operations';
import PizzaContext from '../../../context/PizzaContext';
import TotalContext from '../../../context/TotalContext';

export default function MultiActionAreaCard({pizzas}) {
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

    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={pizzas.url}

        />
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {pizzas.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Quantity = {pizzas.quantity}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" variant='contained' color="info" sx={{ color: 'white' }} onClick={addPizzaToCarts}>
          <h5>+</h5>
        </Button>
        <Button size="small" variant = 'contained' color="error"sx={{ color: 'white' }} onClick={removePizzaFromCarts}>
        <h5>-</h5>
        </Button>
      </CardActions>
    </Card>
  );
}