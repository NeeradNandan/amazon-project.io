import {cart, addToCart, displayCartQuantity} from "../data/cart.js";
import {products, loadProductsFetch} from '../data/products.js';
//import {formatCurrency} from "./utils/money.js";

loadProductsFetch().then(() => {
    renderProductsGrid();
});

function renderProductsGrid() {

    let productsHTML = '';


    const url = new URL(window.location.href);
    const search = url.searchParams.get('search');

    let filteredProducts = products;

    if (search) {
        filteredProducts = products.filter((product) => {
            let matchingKeyword;

            product.keywords.forEach((keyword) => {
                if (keyword.toLowerCase().includes(search.toLowerCase())) {
                    matchingKeyword = true;
                }
            });

            return matchingKeyword || product.name.toLowerCase().includes(search.toLowerCase());
        })
    }

    filteredProducts.forEach((product) => {
        productsHTML += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}" alt="Product Image">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}" 
              alt="Products Ratings Stars">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          
          ${product.extraInfoHTML()} <!-- Polymorphism where we don't know which class is called -->

          <div class="product-spacer"></div>

          <div class="added-to-cart-${product.id} added-to-cart">
            <img src="images/icons/checkmark.png" alt="Checkmark">
            Added
          </div>

          <button class="add-to-cart-button button-primary"
          data-product-id="${product.id}"
          >
            Add to Cart
          </button>
        </div>
    `;
    });

    document.querySelector('.products-grid')
        .innerHTML = productsHTML;

    function updateCartQuantity() {
        document.querySelector('.cart-quantity').innerHTML = String(displayCartQuantity(cart));
    }

    updateCartQuantity();

    document.querySelectorAll('.add-to-cart-button')
            .forEach((button) => {
                let addedMessageTimeoutId = {};
                button
                    .addEventListener('click', () => {
                        const {productId} = button.dataset;

                        addToCart(productId);


                        //console.log(cartQuantity);

                        document.querySelector('.cart-quantity')
                            .innerHTML = String(displayCartQuantity(cart));


                        const addedMessage = document.querySelector(`.added-to-cart-${productId}`);

                        addedMessage.classList.add('added-to-cart-visible');

                        if (addedMessageTimeoutId) {
                            clearTimeout(addedMessageTimeoutId);
                        }

                        addedMessageTimeoutId = setTimeout(() => {
                            addedMessage.classList.remove('added-to-cart-visible');
                        }, 2000);
                    })
            })

    const searchButton = document.querySelector('.searchButton');
    const searchInput = document.querySelector('.searchBar');

    function handleSearchClick () {
        const searchValue = searchInput.value;
        return window.location.href = `index.html?search=${searchValue}`
    }

    searchButton.addEventListener('click', handleSearchClick);

    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handleSearchClick();
        }
    })

}
/*
Below is my own implementation
 */

/*function updateCartQuantity() {
 let cartQuantity = 0;

 cart.forEach((cartItem) => {
 cartQuantity += cartItem.quantity;
 });

 document.querySelector('.cart-quantity')
 .innerHTML = cartQuantity;
 }

 */

/*let timer;

document.querySelectorAll('.add-to-cart-button')
        .forEach((buttonElement) => {
    buttonElement
        .addEventListener('click', () => {
        const productId = buttonElement.dataset.productId;

        const productQuantity = Number(buttonElement.parentElement
            .querySelector(`.quantity-selector-${productId}`).value);

        const addedElement = buttonElement.parentElement
            .querySelector(`.add-cart-${productId}`);
        if (addedElement) {
            addedElement.style.opacity = '1';
        }

        function endAndStartTimer() {
            clearTimeout(timer);
            timer = setTimeout(() => {
                if (addedElement) {
                    addedElement.style.opacity = '0';
                }
            }, 2000);
        }

        endAndStartTimer();

        addedElement.classList.add('added');

        addToCart(productId, productQuantity);

        updateCartQuantity();

        //console.log(cartQuantity);
        //console.log(cart);
    });
});
 */



/*document.querySelector('.cart-quantity')
    .innerHTML = displayCartQuantity(cart);
 */



