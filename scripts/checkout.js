import {renderOrderSummary} from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import {renderCheckoutHeader} from "./checkout/checkoutHeader.js";
import {loadProductsFetch} from "../data/products.js";
// import '../data/cart-class.js';
//import '../data/backend-practice.js'
loadProductsFetch()
    .then(() => {
        renderOrderSummary();
        renderPaymentSummary();
        renderCheckoutHeader();
    })

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
