class Product {
    constructor(id, name, desc, price, url) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.url = url;
        this.isAddedInCart = false;
        this.quantity = 0;
    }
}

export default Product;