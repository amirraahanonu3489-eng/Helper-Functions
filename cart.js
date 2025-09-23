class Cart {
    constructor() {
    this.items = [];
    }
    get total() {
        return this.items.reduce((sum, item) => sum + item.product.price  * item.quantity, 0);
    }

    get totalQuantity() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    addItem(product, quantity = 1) {
        const existing = this.items.find(item => item.product.name === product.name);

        if (existing) {
            existing.quantity += quantity;  // increase quantity
        } else {
            this.items.push({ product, quantity }); // store properly
        }
    }
    

    removeItem(product) {
        this.items = this.items.filter(item => item.product.name !== product.name);
    }

    getItems() {
        return this.items;
    }
}

const cart = new Cart();
export default cart;