function ProductItem({
    item,
    addCart
}){
    return(
        <>
        <div className="product_card">
            <img className="cat_pic" src={item.image} alt="product's picture"/>
            <p>{item.name}</p>
            <p>${item.price}</p>
            <p>type:{item.product_type}</p>
            <button
            className="add_button"
            data-id={item.id}
            onClick={ (e) => {
                const id = e.target.dataset.id;
                addCart(id);
              }}
            >Add to Cart</button>
        </div>
        </>
    );
}

export default ProductItem;