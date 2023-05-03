const uuid = require('uuid').v4;

function makeCatList() {
    const id1 = uuid();
    const id2 = uuid();
    const id3 = uuid();
    const id4 = uuid();
    const id5 = uuid();
    const id6 = uuid();

    const catList = {};
    const cats = {
        [id1] : {
            id : id1,
            name : "Alexander",
            price : 889.99,
            image : '/images/alexander.jpg',
            p_type : "Cats"
        },
        [id2] : {
            id : id2,
            name : "Alvan",
            price : 599.99,
            image :"/images/alvan.jpg",
            product_type : "Cats"
        },
        [id3] : {
            id : id3,
            name : "Hang",
            price : 929.99,
            image : '/images/hang.jpg',
            product_type : "Cats"
        },
        [id4] : {
            id : id4,
            name : "Kabo",
            price :499.99,
            image: '/images/kabo.jpg',
            product_type : "Cats"
        },
        [id5] : {
            id : id5,
            name: 'Karina',
            price : 549.99,
            image: '/images/karina.jpg',
            product_type : "Cats"
        },
        [id6] : {
            id : id6,
            name: 'Manja',
            price : 529.39,
            image: '/images/manja.jpg',
            product_type : "Cats"
        },

    }

    catList.getCats = function getCats() {
        return cats;
      };

    catList.contains = function contains(id) {
        return !!cats[id];
    };

    catList.addCat = function addCat(name, price, image, product_type){
        const id = uuid();
        cats[id] = {
            id,
            name,
            price,
            image,
            product_type,
        };
        return id;
    }

    catList.getCat = function getCat(id) {
        return cats[id];
    }

    catList.deleteCat = function deleteCat(id) {
        delete cats[id];
    }
    

    return catList;
    
}


module.exports = {
    makeCatList,
};