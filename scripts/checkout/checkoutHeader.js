import {displayCartQuantity} from "../../data/cart.js";

export function renderCheckoutHeader() {
    document.querySelector('.checkoutHeader').innerHTML = `<div class="header-content">
        <div class="checkout-header-left-section">
          <a href="index.html">
            <img class="amazon-logo" src="images/amazon-logo.png" alt="Amazon Logo">
            <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png" alt="Amazon Mobile Logo">
          </a>
        </div>

        <div class="checkout-header-middle-section">
          Checkout (<a class="return-to-home-link return-home-link"
            href="index.html">${displayCartQuantity()}</a>)
        </div>

        <div class="checkout-header-right-section">
          <img src="images/icons/checkout-lock-icon.png" alt="Checkout Icon">
        </div>
      </div>
`;
}