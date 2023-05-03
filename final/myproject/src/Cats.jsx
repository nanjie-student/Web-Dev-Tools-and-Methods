import CatItem from "./CatItem";

function Cats({
    catList,
    addCart,
}) {
    return(
        <div className="mainCatList">
            <ul className="cats">
                { Object.values(catList).map( item => (
                    <li className="catsItem" key={item.id}>
                        <CatItem
                        item = {item}
                        addCart = {addCart}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Cats;