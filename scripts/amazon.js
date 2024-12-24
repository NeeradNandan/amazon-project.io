import { cart } from '../data/cart.js';
import { products } from '../data/products.js';

let productsHTML = '';


products.forEach((product) => {
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
              src="images/ratings/rating-${product.rating.stars * 10}.png" alt="Products Ratings Stars">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
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

          <div class="product-spacer"></div>

          <div class="added-to-cart add-cart-${product.id}">
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
    .innerHTML  = productsHTML;



document.querySelectorAll('.add-to-cart-button')
        .forEach((buttonElement) => {
    buttonElement
        .addEventListener('click', () => {
        const productId = buttonElement.dataset.productId;
        const productQuantity = Number(buttonElement.parentElement
            .querySelector(`.quantity-selector-${productId}`).value);
        const addedElement = buttonElement.parentElement
            .querySelector(`.add-cart-${productId}`);
        addedElement.style.opacity = '1';
        let timer;
        endAndStartTimer();
        function endAndStartTimer() {
            clearTimeout(timer);
            timer = setTimeout(() => {
                addedElement.style.opacity = '0';
                }, 2000);
        }
        addedElement.classList.add('added');
        let matchingItem;
        cart.forEach((item) => {
            if(productId === item.id) {
                matchingItem = item;
            }
        });
        
        if (matchingItem) {
            matchingItem.quantity += productQuantity;
        }
        else {
            cart.push({
                          id: productId,
                          quantity: productQuantity
                      });
        }
        
        let cartQuantity = 0;
        
        cart.forEach((item) => {
            cartQuantity += item.quantity;
        });
        
        document.querySelector('.cart-quantity')
            .innerHTML = cartQuantity;
        //console.log(cartQuantity);
        //console.log(cart);
    });
});

