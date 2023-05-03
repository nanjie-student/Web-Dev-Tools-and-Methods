const PAGES = {
    PRODUCTS: 'products',
    CART: 'cart',
};
const state ={
    products: [
        {name: 'Fluffball',img: "http://placekitten.com/150/150?image=1",  price: '$0.99'},
        {name: 'General Mayhem',img: "http://placekitten.com/150/150?image=2", price: '$3.14'},
        {name: 'Meow is the time', img: "http://placekitten.com/150/150?image=3",price: '$2.73'},
    ],
    cart:[],
    page: PAGES.PRODUCTS,  
};
export const pages = PAGES;
export default state;
