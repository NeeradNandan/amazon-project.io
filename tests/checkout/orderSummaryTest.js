import { loadFromStorage, cart } from "../../data/cart.js";
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import {loadProductsFetch} from "../../data/products.js";

describe('Test Suite: renderOrderSummary', () => {
    beforeAll(async () => {
        await loadProductsFetch();
    }) 

    beforeEach(() => {
        const mockElementOrder = document.createElement('div');
        mockElementOrder.className = 'order-summary';
        document.body.appendChild(mockElementOrder);
        const mockElementPayment = document.createElement('div');
        mockElementPayment.className = 'paymentSummary';
        document.body.appendChild(mockElementPayment);
        const mockElementCheckoutHeader = document.createElement('div');
        mockElementCheckoutHeader.className = 'checkoutHeader';
        document.body.appendChild(mockElementCheckoutHeader);
        
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                                      {
                                          id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                                          quantity: 2,
                                          deliveryOptionId: '1'
                                      },
                                      {
                                          id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                                          quantity: 1,
                                          deliveryOptionId: '2'
                                      }]);
        });
        loadFromStorage();

        renderOrderSummary();
    });
        afterEach(() => {
            document.body.removeChild(document.querySelector('.order-summary'));
            document.body.removeChild(document.querySelector('.paymentSummary'));
            document.body.removeChild(document.querySelector('.checkoutHeader'));
        });
    
    it('Displays the Cart', () => {
        expect(document.querySelectorAll('.cartItemContainer')
                       .length).toEqual(2);
        expect(document.querySelector('.productQuantity-e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
                   .innerText).toContain('Quantity: 2');
        expect(document.querySelector('.productQuantity-15b6fc6f-327a-4ec4-896f-486349e85a3d')
               .innerText).toContain('Quantity: 1');

        });
    
    it('Removes a product', () => {
        expect(document.querySelector('.deleteQuantityLink-e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
                   .click());
        expect(document.querySelectorAll('.cartItemContainer')
                   .length).toEqual(1);
        expect(document.querySelector('.cart-item-container-e43638ce-6aa0-4b85-b27f-e1d07eb678c6'))
            .toEqual(null);
        expect(document.querySelector('.productQuantity-15b6fc6f-327a-4ec4-896f-486349e85a3d'))
            .not.toEqual(null)
        expect(cart.length).toEqual(1);
        expect(cart[0].id).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    });
    
    it('Gets delivery option', () => {
        document.querySelector('.deliveryOptionInput-3-e43638ce-6aa0-4b85-b27f-e1d07eb678c6').click();

        expect(document.querySelector('.deliveryOptionInput-3-e43638ce-6aa0-4b85-b27f-e1d07eb678c6').checked).toEqual(true);
        expect(cart.length).toEqual(2);
        expect(cart[0].id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].deliveryOptionId).toEqual('3');
        expect(document.querySelector('.paymentSummaryShipping').innerText).toContain('$14.98')
        expect(document.querySelector('.paymentSummaryTotal').innerText).toContain('$63.50')
    });
});

