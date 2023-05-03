"use strict";
// import state from "./state";
// import {pages} from "./state";

(function () {

    const pages = {
        PRODUCTS: 'products',
        CART: 'cart',
    };
    const state ={
        products: [
            { img: "http://placekitten.com/150/150?image=1", name: 'Fluffball', price: '$0.99'},
            { img: "http://placekitten.com/150/150?image=2",  name: 'General Mayhem', price: '$3.14'},
            { img: "http://placekitten.com/150/150?image=3",  name: 'Meow is the time', price: '$2.73'},
        ],
        cart: [],
        total: 0,
    
        page: pages.PRODUCTS,  
    };
    
    const appEl = document.querySelector('#app');

    function render(state) { 
        if(state.page === pages.PRODUCTS) { 
            renderProducts();
            console.log("print products");
            return;
        }if(state.page === pages.CART) { 
            renderCart();
            console.log("print cartHtml")
            return;
        } 
    }
    function renderProducts() {
        const productHtml = state.products.map((product, index) => {
            console.log("run some code");
            return `
            <div class="product-cat">
                <li class="card-cat">
                    <span class="cat-name">${product.name}</span>
                    <img src="${product.img}" alt="${product.name}">
                    <span class="cat-price">${product.price}</span>
                    </span>
                    <button class="cat-add" data-index="${index}">Add to Cart</button>
                    <button class="cat-delete" data-index="${index}">Delete to Cart</button>
                <li>
            </div>
                `;
        }).join('');
        appEl.innerHtml = `
        <ul class="card-cats">
         ${productHtml} 
        </ul> 
        <form action="" class="add-cat">
            <label> 
                New Cat 
            <input class="new-cat"> 
            </label> 
        <button type="submit">Add</button> 
        </form> 
        <button type="button" class="page" data-target="${pages.CART}">
        View Cart
        </button>
        `
        ;
        const addButtons = document.querySelectorAll('.add-cat');
        addButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                const selectedCat = state.products[index];
                selectedCat.quantity += 1;
                state.cart.products.push(selectedCat);
                state.cart.total += Number(selectedCat.price.slice(1)); // add cat price to cart total
                render();
            });
        });
    };
    function renderCart(){
        let cartHtml;
        let total = 0;
        if(state.cart.length === 0){
            cartHtml = "<p>Nothing in the cart</p>"
        }else {
            cartHtml = state.cart.map((product,index)  =>{
                total += product.quantity * parseFloat(product.price.slice(1));
                return `
                <div class="cart_product">
                    <img src="${product.img}" alt="${product.name}">
                    <div class="info">
                        <h3>${product.name}</h3>
                        <p>${product.price}</p>
                        <input type="number" value="${product.quantity}" data-index ="${index}">
                    </div>
                </div>
                `;
            }).join('');
            appEl.innerHtmL = `
            <h2>Cart Page</h2>
            <ul>
            ${state.cart.products.map(cat => `<li>${cat.name} x ${cat.quantity}</li>`).join('')}
            </ul>
            <p>Total: $${state.cart.total.toFixed(2)}</p>
            <button type="button" class="hide-cart">Hide Cart</button>
            <button type="button" class="checkout">Checkout</button>
            <button type="button" class="page" data-target="${pages.PRODUCTS}">
            View Product
            </button>
            `
            ;
        }
        
        console.log("to be determined");
    }
    appEl.addEventListener('submit', (e) => { 
        e.preventDefault(); 
        const newproduct = document.querySelector('.new-cat').value; 
        products.push({newproduct }); 
        render(); 
    });
    //click 
    appEl.addEventListener('click', (e) => {
        if (e.target.classList.contains('cat-add')) {
            //code for cat done toggle
            const index = e.target.dataset.index;
            const selectedCat = state.products[index];
            selectedCat.quantity += 1;
            state.cart.products.push(selectedCat);
            state.cart.total += Number(selectedCat.price.slice(1));
            render();
            return;

        }
        if (e.target.classList.contains('cat-add')) {
            //code for add cat
            const index = e.target.dataset.index;
            state.products.push(index, 1);
            render();
            return;
        }
        //code for deleting cat
        if (e.target.classList.contains('cat-delete')) {
            const index = e.target.dataset.index;
            state.products.splice(index, 1);
            render();
            return;
        }
        //change page
        if (e.target.classList.contains('page')) {
            state.page = e.target.dataset.target;
            render();
            return;
        }
    });

})();
