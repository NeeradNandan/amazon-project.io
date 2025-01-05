class Cart {
    cartItems;
    #localStorageKey; //Private Property: Cannot be accessed outside the class

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage(); //Private Method
    }

    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

        if (!this.cartItems) {
            this.cartItems = [
                {
                    id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 2,
                    deliveryOptionId: '1'
                },
                {
                    id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 1,
                    deliveryOptionId: '2'
                }];
        }
    }

    saveToCart() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId) {
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.id) {
                matchingItem = cartItem;
            }
        });

        const quantitySelector = document.querySelector(`.quantity-selector-${productId}`) || '1';

        const quantity = Number(quantitySelector.value);

        //console.log(quantity);
        if (matchingItem) {
            matchingItem.quantity += quantity;
        } else {
            this.cartItems.push({
                                    id: productId,
                                    quantity: quantity,
                                    deliveryOptionId: '1'
                                });
        }
        this.saveToCart();
    }

    deleteFromCart(productId) {
        this.cartItems.forEach((cartItem, index) => {
            if (cartItem.id === productId) {
                // console.log(cart);
                this.cartItems.splice(index, 1);
            }
        })

        this.saveToCart();
    }

    displayCartQuantity() {
        let cartQuantity = 0;
        this.cartItems.forEach((cartItem) => {
            cartQuantity += Number(cartItem.quantity);
        })

        return Number(cartQuantity);
    }

    updateQuantity(productId, newQuantity) {
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.id) {
                matchingItem = cartItem;
            }
        });

        matchingItem.quantity = newQuantity;

        this.saveToCart();
    }

}


const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');



//cart.addToCart('8c9c52b5-5a19-4bcb-a5d1-158a74287c53');


console.log(cart);
console.log(businessCart);
