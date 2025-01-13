import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {cart, saveToCart} from "./cart.js";

export const deliveryOptions = [
    {
        id: '1',
        deliveryDays: 7,
        priceCents: 0
    },
    {
        id: '2',
        deliveryDays: 3,
        priceCents: 499
    },
    {
        id: '3',
        deliveryDays: 1,
        priceCents: 999
    }
]

export function getDeliveryOption(deliveryOptionsId) {
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionsId) {
            deliveryOption = option;
        }
    });
    return deliveryOption || deliveryOptions[0]
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });
    
    if(!matchingItem) {
        return;
    }
    
    if(!validDeliveryOption(deliveryOptionId)) {
        return;
    }

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToCart();
}

export function deliveryDate (deliveryOptionsId) {
    //return dayjs().add(getDeliveryOption(deliveryOptionsId).deliveryDays, 'days')

    let remainingDays = getDeliveryOption(deliveryOptionsId).deliveryDays;
    let deliveryDate = dayjs();

    while (remainingDays > 0) {
        deliveryDate = deliveryDate.add(1, 'days');

        if (!isWeekend(deliveryDate)) {
            remainingDays--;
        }
    }
    return deliveryDate
}

function isWeekend(date) {
    const dayOfWeek = date.format('dddd');

    return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}

export function validDeliveryOption(deliveryOptionId) {
    let found = false;

    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            found = true;
        }
    });
    return found

}

