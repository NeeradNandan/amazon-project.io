import {cart, resetCart} from "./cart.js";

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

export async function sendOrder() {
    try {
        const response = await fetch('https://supersimplebackend.dev/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                                     cart: cart
                                 })
        });

        const order = await response.json();
        addOrder(order);
    }
    catch(error) {
        console.log(error);
    }

    resetCart();
}

export function getOrder(orderId) {
    let matchingOrder;

    orders.forEach((order) => {
        if (order.id === orderId) {
            matchingOrder = order;
        }
    });
    return matchingOrder
}