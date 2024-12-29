import {formatCurrency} from "../../scripts/utils/money.js";

describe ('Test Suite: formatCurrency', () => {
    it('Converts cents to dollars', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    })

    it('Converts 0 to 0.00', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    })
    
    it('Converts 2000.5 to 20.01', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    })
    
    it('Converts 2000.49 to 20.01', () => {
        expect(formatCurrency(2000.49)).toEqual('20.00');
    })
    
});