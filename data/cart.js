export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart) {
    cart = [
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

export function addToCart(productId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.id) {
            matchingItem = cartItem;
        }
    });

    const quantitySelector = document.querySelector(`.quantity-selector-${productId}`);

    const quantity = Number(quantitySelector.value);

    if (matchingItem) {
        matchingItem.quantity += quantity;
    } else {
        cart.push({
                      id: productId,
                      quantity: quantity,
                      deliveryOptionId: '1'
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

export function displayCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    })

    return Number(cartQuantity);
}

export function updateQuantity(productId, newQuantity) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.id) {
            matchingItem = cartItem;
        }
    });

    matchingItem.quantity = newQuantity;

    saveToCart();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.id) {
            matchingItem = cartItem;
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToCart();
}