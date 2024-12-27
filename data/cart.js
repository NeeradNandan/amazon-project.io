export let cart = JSON.parse(localStorage.getItem('cart'));

if(cart.length === 0) {
    cart = [
        {
            id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2
        },
        {
            id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1
        }];
}

export function addToCart(productId, productQuantity) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.id) {
            matchingItem = cartItem;
        }
    });
    
    if (matchingItem) {
        matchingItem.quantity += productQuantity;
    } else {
        cart.push({
            id: productId,
            quantity: productQuantity
        });
    }

    saveToCart();
}

export function deleteFromCart (productId) {
    cart.forEach((cartItem, index) => {
        if (cartItem.id === productId) {
           // console.log(cart);
            cart.splice(index, 1);
        }
    })

    saveToCart();
}

export function saveToCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function displayCartQuantity(cart) {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    })

    return cartQuantity;
}