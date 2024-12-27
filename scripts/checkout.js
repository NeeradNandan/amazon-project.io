import {addToCart, cart, deleteFromCart, displayCartQuantity, saveToCart} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency} from "./utils/money.js";

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
    const productId = cartItem.id;
    //const productQuantity = cartItem.quantity;

    let matchingProduct;

    products.forEach((product) => {
        if (productId === product.id) {
            matchingProduct = product;
        }
    });


    cartSummaryHTML += `
    <div class="cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}" alt="Product Image">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label-${matchingProduct.id}">${quantityLabel(matchingProduct.id)}</span>
                  </span>
                  <span 
                  data-product-id="${matchingProduct.id}"
                  class="update-quantity-link link-primary">
                    Update
                  </span>
                  <input type="number" min="0" max="1000" class="quantity-input-${matchingProduct.id} input-frame">
                  <span
                  class="save-quantity-link-${matchingProduct.id} save-link-primary link-primary">
                    Save
                  </span>
 
                  <span class="delete-quantity-link link-primary"
                  data-product-id="${matchingProduct.id}"
                  >
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `
});

document.querySelector('.order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.delete-quantity-link')
    .forEach((linkElement) => {
    linkElement
        .addEventListener('click', () => {
            const productId = linkElement.dataset.productId;

            deleteFromCart(productId);


            document.querySelector(`.cart-item-container-${productId}`).remove();
            document.querySelector('.checkout-header-middle-section').innerHTML = `Checkout (<a
             class="return-to-home-link" href="amazon.html">${displayCartQuantity(cart)} items</a>)`;
            document.querySelector('.payment-summary-items').innerHTML = `Items (${displayCartQuantity(cart)})`;
            //console.log(cart);

    });
});

document.querySelectorAll('.update-quantity-link')
    .forEach((linkElement) => {
        linkElement.
            addEventListener('click', () => {
                const productId = linkElement.dataset.productId;
            document.querySelector('.update-quantity-link').style.display = 'none';

                document.querySelector(`.quantity-input-${productId}`).style.display = 'inline';
                document.querySelector(`.save-quantity-link-${productId}`).style.display = 'inline';
                document.querySelector(`.save-quantity-link-${productId}`).
                    addEventListener('click', () => {
                    updateSave(productId);

                });
                document.querySelector(`.quantity-input-${productId}`).
                    addEventListener('keydown', (event) => {
                        if(event.key === 'Enter') {
                            updateSave(productId);
                        }
                    })
        })
    })

document.querySelector('.checkout-header-middle-section').innerHTML = `Checkout (<a class="return-to-home-link"
 href="amazon.html">${displayCartQuantity(cart)} items</a>)`;
document.querySelector('.payment-summary-items').innerHTML = `Items (${displayCartQuantity(cart)})`;

function updateSave(productId) {
    const productQuantity = Number(document.querySelector(`.quantity-input-${productId}`).value);
    addToCart(productId, productQuantity);
    saveToCart();

    document.querySelector(`.quantity-label-${productId}`).innerHTML = `${quantityLabel(productId)}`;
    document.querySelector('.checkout-header-middle-section').innerHTML = `Checkout (<a class="return-to-home-link" href="amazon.html">${displayCartQuantity(cart)} items</a>)`;
    document.querySelector('.payment-summary-items').innerHTML = `Items (${displayCartQuantity(cart)})`;

    document.querySelector('.update-quantity-link').style.display = 'inline';

    document.querySelector(`.quantity-input-${productId}`).style.display = 'none';
    document.querySelector(`.save-quantity-link-${productId}`).style.display = 'none';
}

function quantityLabel(productId) {
    let matchingProduct;

    cart.forEach((cartItem) => {
        if(productId === cartItem.id) {
            matchingProduct = cartItem;
        }
    });

    return matchingProduct.quantity;

}
