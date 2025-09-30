class Cart {
    constructor() {
    this.items = JSON.parse(localStorage.getItem("cartItems")) || [];
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
            existing.quantity += quantity;  
        } else {
            this.items.push({ product, quantity }); 
        }
    
    localStorage.setItem("cartItems", JSON.stringify(this.items));

}

    removeItem(product) {
        this.items = this.items.filter(item => item.product.name !== product.name);
        localStorage.setItem("cartItems", JSON.stringify(this.items));
    }

    updateItem(product, quantity) {
        const existing = this.items.find(item => item.product.name === product.name);
        
        if (existing) {
            if (quantity <= 0) {
                this.removeItem(product);
            } else {
                existing.quantity = quantity;
            }
        } else if (quantity > 0) {
            this.items.push({ product, quantity });
        }
            localStorage.setItem("cartItems", JSON.stringify(this.items));
    }

    getItems() {
        return this.items;
    }
}

const cart = new Cart();
export default cart;