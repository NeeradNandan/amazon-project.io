import {renderOrderSummary} from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import {renderCheckoutHeader} from "./checkout/checkoutHeader.js";
import {loadProductsFetch} from "../data/products.js";
import {loadCartFetch} from "../data/cart.js";
// import '../data/cart-class.js';
//import '../data/backend-practice.js'
async function loadPage() {
    try {
       await Promise.all([
                           loadProductsFetch(),
                           loadCartFetch()
                         ])
    }
    catch(error) {
        console.log(error);
    }

    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
}

loadPage();

/*
Async should always be followed by await, await cannot be used outside or after a method.
 */

/*loadProductsFetch()
    .then(() => {
        renderOrderSummary();
        renderPaymentSummary();
        renderCheckoutHeader();
    })
    
 */
/*
The issue with promises is that we have to write a lot of code like resolve and use Promise everytime to use a new
 method and use then to get values from the previous promise and run the next method.
 Instead, we can use async/await.
 An async returns a promise.
 */

/*
The advantage of promise over callback is that it allows us to chain promises together, instead of nesting callbacks.
 */

/*

Promise.all([                       It waits for all promises to resolve before executing the next then function
     new Promise((resolve) => {
     loadProducts(() => {
        resolve('value1');
        })
     }),
     new Promise((resolve) => {
     loadCart(() => {
        resolve();
        });
     })
   })
]).then((value) => {
    console.log(value); // ['value1', undefined]
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
});

new Promise((resolve) => {
    loadProducts(() => {
        resolve('value1');
    })
}).then((value) => {
    console.log(value); //value1 is displayed which means basically the resolve value of the previous promise is
                                                    passed to the next then function
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })
}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
})
 */
