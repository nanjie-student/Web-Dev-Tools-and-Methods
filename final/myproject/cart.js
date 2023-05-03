const uuid = require('uuid').v4;

function makeCart() {
    const Cart = {};
    const cats = {}
    let totalPrice = 0;


    Cart.getCats = function getCats() {
        return cats;
      };

    Cart.getTotalPrice = function getTotalPrice() {
        return totalPrice;
    }

    
    Cart.contains = function contains(id) {
        return !!Cart[id];
    };

    Cart.addCat = function addCat(id, name, price, image, product_type){
        if(!!cats[id]){
            cats[id].count = cats[id].count+1;
            totalPrice = totalPrice + price;
            return;
        }
        cats[id] = {
            id,
            name,
            price,
            image,
            product_type,
            count:1
        };
        totalPrice = totalPrice + price;
        return;
    };

    Cart.deleteCat = function deleteCat(id) {
        const price = cats[id].price;
        if(cats[id].count > 1){
            cats[id].count = cats[id].count-1;
            totalPrice = totalPrice - price;
            return;
        }
        delete cats[id];
        totalPrice = totalPrice - price;
        return;
    };
    
    Cart.checkout = function checkout() {
        totalPrice = 0;
        for( const key in cats){
            delete cats[key];
        }
        return
    }; 
    return Cart;  
}
module.exports = {
    makeCart,
};