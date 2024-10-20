const ProductCard = ({ image, title, price }) => {
  return (
    <li className="product ">
      <div className="product__card">
        <img src={image} alt="" />
        <h5>{title}</h5>
        <h2>${price.toFixed(2)}</h2>
      </div>
    </li>
  );
};

export default ProductCard;
