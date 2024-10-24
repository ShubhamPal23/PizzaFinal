//Transformation json-object and vice versa CRUD
import networkOperations from "../../../shared/services/networkcall.js";
import Product from "../model/product.js";

const productOperations = {
    products:[],
    dbproducts:[],
    async loadProducts(){
        const pizza = await networkOperations.getData('https://raw.githubusercontent.com/ShubhamPal23/PizzaJson/refs/heads/main/pizza.json');
        const pizzaArray = pizza['Vegetarian'];
        const productArray = pizzaArray.map(pizza=>{
            const currentPizza = new Product(pizza.id,pizza.name,pizza.menu_description,pizza.price,pizza.assets.product_details_page[0].url)
            return currentPizza;
        })
        this.products =productArray;
        return productArray;
    },
    async loaddbProducts(){
        const pizza = await networkOperations.getData('https://jmd-kwob.onrender.com/showpizza');
        const pizzaArray = pizza;
        console.log(pizza);
        const productArray = pizzaArray.map(pizza=>{
            const currentPizza = new Product(pizza.pizzaId,pizza.pizzaName,pizza.pizzaDesc,pizza.pizzaPrice,pizza.pizzaSrc)
            return currentPizza;
        })
        this.dbproducts = productArray;
        return productArray;
    },
    getProductsInCart(){
        console.log(this.products);
        const productInCart = this.products.filter(product=>product.isAddedInCart).concat(this.dbproducts.filter(product=>product.isAddedInCart));
        return productInCart;
    },
    sortProducts(){}

}
export default productOperations;