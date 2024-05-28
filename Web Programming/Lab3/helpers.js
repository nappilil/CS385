//Todo You can use this file for any helper functions you may need. This file is optional and you don't have to use it if you do not want to.
let sortLastNames = (x, y) => {
    if (x.LastName > y.LastName) {
        return 1;
    }
    else if (x.LastName < y.LastName) {
        return -1;
    } else {
        return 0;
    }
}
let minMaxHelper = (array) => {
    let min = array[0].price; // min price
    let max = array[0].price; // max price

    for (let i = 0; i<=array.length-1; i++) {
        let current = array[i].price; // current price to compare
        // compare current value to stored min and max
        if (current > max) {
            max = current; // update maximum value
        }
        if (current < min) {
            min = current; // update minimum value
        }
    }
    return [max, min];
}
export {sortLastNames, minMaxHelper};
