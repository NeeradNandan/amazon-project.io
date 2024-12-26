export const cart = [];

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
}