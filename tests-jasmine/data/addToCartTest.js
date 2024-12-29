import {addToCart, loadFromStorage} from "../../data/cart.js";
import { cart } from '../../data/cart.js';

describe('Test Suite: addToCart', () => {
    beforeEach(() => {
        const mockElement = document.createElement('select');
        mockElement.className = 'quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
        // Create the <option> elements
        for (let i = 1; i <= 10; i++) {
            const option = document.createElement('option');
            option.value = i.toString();
            option.textContent = i.toString();

            // Set the default selected value
            if (i === 1) {
                option.selected = true;
            }

            mockElement.appendChild(option);
        }

        // Append the mock element to the DOM
        document.body.appendChild(mockElement);
    });
    
    afterEach(() => {
        document.body.removeChild(document.querySelector('.quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6'));
    });

     
    it('Adds an existing item to the cart', () => {
        spyOn(localStorage, 'setItem');
        
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();
        
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(3);
    });

    it('Adds a new item to the cart', () => {
        spyOn(localStorage, 'setItem');
        
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        //console.log(localStorage.getItem('cart'));
        loadFromStorage();
        
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    });
});