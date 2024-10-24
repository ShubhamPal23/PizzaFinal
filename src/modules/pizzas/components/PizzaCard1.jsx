import * as React from 'react';
import { styled } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '@mui/material';
import productOperations from '../services/product-operations';
import PizzaContext from '../../../context/PizzaContext';
import TotalContext from '../../../context/TotalContext';
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
import { CenterFocusStrong } from '@mui/icons-material';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({pizzas}) {
  const{piz,setPizzas} = React.useContext(PizzaContext);
  var {total,setTotal,quantity,setQuantity} = React.useContext(TotalContext);
    const addPizzaToCarts=()=>{
        pizzas.isAddedInCart = true;
        pizzas.quantity += 1;
        // setCartPizza(productOperations.getProductsInCart());
        setPizzas(productOperations.getProductsInCart());
        total += parseFloat(pizzas.price);
        quantity += 1;
        setQuantity(quantity);
        setTotal(total)
    }
  const [expanded, setExpanded] = React.useState(false);
  const [favorite, setFavorite] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const toggleFavorite = () => {
    setFavorite(!favorite); 
  };
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: pizzas.name,
        text: `Check out this delicious pizza: ${pizzas.name}!`,
        url: window.location.href 
      }).then(() => {
        console.log('Thanks for sharing!');
      }).catch((error) => {
        console.error('Error sharing:', error);
      });
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };

  return (
    <div className='col-4'>
     <MDBCard className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>

      <CardMedia
        component="img"
        height="194"
        image={pizzas.url}
        alt="Paella dish"
      />
      <MDBCardBody className="p-0">
      <Typography gutterBottom variant="h5" component="div" textAlign={'center'}>
            {pizzas.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div" textAlign={'center'} sx = {{color:"blue"}}>
            Rs.{pizzas.price}
          </Typography>
      </MDBCardBody>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={toggleFavorite}>
          <FavoriteIcon sx={{ color: favorite ? 'red' : 'inherit' }}/>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon onClick={handleShare}/>
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Description</Typography>
          <Typography paragraph>
            {pizzas.desc}
          </Typography>
        </CardContent>
      </Collapse>
      <CardActions>
        <Button size="small" color="primary" onClick={addPizzaToCarts}>
          Add To Cart
        </Button>
      </CardActions>
    </MDBCard>
    <hr className="my-4" />
    </div>
  );
}