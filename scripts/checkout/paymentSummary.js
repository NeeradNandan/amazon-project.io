import {cart, displayCartQuantity} from "../../data/cart.js";
import {getDeliveryOption} from "../../data/deliveryOptions.js";
import {getProduct} from "../../data/products.js";
import {formatCurrency} from "../utils/money.js";
import {addOrder, orders} from "../../data/orders.js";

export function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.id);
        productPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    })
    const totalBeforeTaxes = productPriceCents + shippingPriceCents;
    const taxCents = 0.1 * totalBeforeTaxes;
    const totalAfterTaxes = totalBeforeTaxes + taxCents;

    document.querySelector('.paymentSummary')
        .innerHTML = `
    <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div class="payment-summary-items">Items (${displayCartQuantity()}): </div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money paymentSummaryShipping">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxes)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money paymentSummaryTotal">$${formatCurrency(totalAfterTaxes)}</div>
          </div>

          <button class="place-order-button button-primary placeOrderButton">
            Place your order
          </button>
`;
    document.querySelector('.placeOrderButton')
            .addEventListener('click', async () => {
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

               window.location.href = 'orders.html';
            });

}