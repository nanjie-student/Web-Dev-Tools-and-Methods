function CartItem({
    item,
    addCart,
    onDeleteCartItem
}) {
    return (
        <>
            <div className="cat_content">
                <img className ="cat_picture" src={item.image} alt="cat's picture" />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>type:{item.product_type}</p>
                <p>count: {item.count} </p>
                <button
                    className="cartItemCount"
                    data-id={item.id}
                    onClick={(e) => {
                        const id = e.target.dataset.id;
                        onDeleteCartItem(id);
                    }}
                >Mius</button>
                <button
                    className="cartItemCount"
                    data-id={item.id}
                    onClick={(e) => {
                        const id = e.target.dataset.id;
                        addCart(id);
                    }}
                >Add</button>
            </div>
        </>
    );
}

export default CartItem;