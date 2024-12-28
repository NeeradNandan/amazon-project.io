import {formatCurrency} from "../scripts/utils/money.js";


console.log('Test suite: formatCurrency');
/*
Basic test cases

Check that the code is working properly
 */
if (formatCurrency(2095) === '20.95') {
    console.log('4 digit test passed');
} else {
    console.log('4 digit test failed');
}

/*
Edge Test Cases

Check for values that are tricky for the code to execute
 */

if (formatCurrency(0) === '0.00') {
    console.log('0 value test passed');
} else {
    console.log('0 value  test failed');
}

if (formatCurrency(2000.5) === '20.01') {
    console.log('Round up test passed');
} else {
    console.log('Round up test failed');
}

if (formatCurrency(2000.49) === '20.00') {
    console.log('Round down test passed');
} else {
    console.log('Round down test failed');
}
