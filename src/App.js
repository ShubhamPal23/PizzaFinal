import { Route, Routes } from 'react-router-dom';
import './App.css';
import Show from './modules/pizzas/page/ShowPizzas';
import { UserPage } from './modules/user/pages/UserPage';
import Login1 from './modules/user/pages/Login1';
import Register1 from './modules/user/pages/Register1';
import AddPizza1 from './modules/pizzas/page/AddPizza1';
import ImageSlider from './shared/Carousel/ImageSlider';
import images from './shared/Carousel/images';
import { NavBar } from './shared/components/NavBar';
import { useState } from 'react';
import { PizzaContextProvider } from './context/PizzaContextProvider';
import Cart1 from './modules/pizzas/page/Cart1';

function App() {
  const [isAdmin, setAdmin] = useState(true);
  return (
    <PizzaContextProvider>
      <NavBar state={isAdmin} />

      <Routes className="bodies">
        <Route path="/register" element={<Register1 />}></Route>
        <Route path="/" element={<><ImageSlider images={images} /></>}></Route>
        <Route path="/menu" element={<><Show /></>}></Route>
        <Route path="/addpizza" element={<AddPizza1 />}></Route>
        <Route path="/login" element={<Login1 />}></Route>
        <Route path="/cart" element={<Cart1 />}></Route>
        <Route path="/logg/:id" element={<UserPage />}></Route>
      </Routes>
    </PizzaContextProvider>
  );
}

export default App;
