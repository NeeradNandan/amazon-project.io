import {addToCart, cart, deleteFromCart, displayCartQuantity, saveToCart, updateQuantity} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency} from "./utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

const deliveryDate1 = dayjs().add(1, 'days').format('dddd, MMMM D');
const deliveryDate7 = dayjs().add(7, 'days').format('dddd, MMMM D');
const deliveryDate3 = dayjs().add(3, 'days').format('dddd, MMMM D');


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
    <div class="cart-item-container cart-item-container-${matchingProduct.id}">
            <div class="delivery-date-${matchingProduct.id} delivery-date">
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
                    Quantity: <span class="quantity-label quantity-label-${matchingProduct.id}"></span>
                  </span>
                  <span 
                  data-product-id="${matchingProduct.id}"
                  class="update-quantity-link link-primary">
                    Update
                  </span>
                  <input type="number" min="0" max="1000" class="quantity-input quantity-input-${matchingProduct.id}">
                  <span
                  data-product-id="${matchingProduct.id}"
                  class="save-quantity-link link-primary">
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
                    name="${matchingProduct.id}"
                    value="standard">
                  <div>
                    <div class="delivery-option-date">
                      ${deliveryDate7}
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="${matchingProduct.id}"
                    value="express">
                  <div>
                    <div class="delivery-option-date">
                      ${deliveryDate3}
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="${matchingProduct.id}"
                    value="overnight">
                  <div>
                    <div class="delivery-option-date">
                      ${deliveryDate1}
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

            const container = document.querySelector(`.cart-item-container-${productId}`);
            container.remove();

            updateCartQuantity();



            /*document.querySelector(`.cart-item-container-${productId}`).remove();
            document.querySelector('.checkout-header-middle-section').innerHTML = `Checkout (<a
             class="return-to-home-link" href="amazon.html">${displayCartQuantity(cart)} items</a>)`;
            document.querySelector('.payment-summary-items').innerHTML = `Items (${displayCartQuantity(cart)})`;
            //console.log(cart);

             */

    });
});
function updateCartQuantity() {

    //console.log(typeof displayCartQuantity());
    document.querySelector('.return-home-link')
        .innerHTML = `${displayCartQuantity()} items`;
}

updateCartQuantity();

document.querySelectorAll('.update-quantity-link')
    .forEach((linkElement) => {
    linkElement
        .addEventListener('click', () => {
            const productId = linkElement.dataset.productId;
            console.log(productId);
            const container = document.querySelector(`.cart-item-container-${productId}`);

            console.log(container);

            container.classList.add('is-editing-quantity');


        })
})

document.querySelectorAll('.save-quantity-link')
    .forEach((linkElement) => {
        linkElement
            .addEventListener('click', () => {
                const productId = linkElement.dataset.productId;

                const quantityInput = document.querySelector(`.quantity-input-${productId}`);
                const newQuantity = quantityInput.value;

                
                updateQuantity(productId, newQuantity);

                const container = document.querySelector(`.cart-item-container-${productId}`);
                container.classList.remove('is-editing-quantity');

                const quantityLabel = document.querySelector(`.quantity-label-${productId}`);
                quantityLabel.innerHTML = newQuantity;

                updateCartQuantity();


            })
    })


/*
My implementation
 */
/*
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

document.querySelectorAll('.delivery-option-input').forEach((optionElement) => {
   optionElement.addEventListener('click', () => {
       const productId = optionElement.name;
       const deliveryOption = optionElement.value;
       if(deliveryOption === 'standard') {
           document.querySelector(`.delivery-date-${productId}`).innerHTML = `Delivery Date: ${deliveryDate7}`;
       } else if (deliveryOption === 'express') {
           document.querySelector(`.delivery-date-${productId}`).innerHTML = `Delivery Date: ${deliveryDate3}`;
       } else if (deliveryOption === 'overnight') {
           document.querySelector(`.delivery-date-${productId}`).innerHTML = `Delivery Date: ${deliveryDate1}`;
       }
   })
})
 */

