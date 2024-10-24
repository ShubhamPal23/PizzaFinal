import React, { useState } from "react";
import PizzaContext from "./PizzaContext";
import TotalContext from "./TotalContext";


export const PizzaContextProvider = ({children}) => {
    const [piz,setPizzas] = useState([]);
    const[total,setTotal] = useState(0);
    const[quantity,setQuantity] = useState(0);
  return (
    <PizzaContext.Provider value={{piz,setPizzas}}>
        <TotalContext.Provider value={{total,setTotal,quantity,setQuantity}}>
            {children}
        </TotalContext.Provider>
    </PizzaContext.Provider>
  )
}
