import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


const ProductDetails = () => {
  const [product, setProduct] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        console.log(data);
        setProduct(data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, []);

  return (
    <div className="product_details">
      {product && (
        <>
          <h1>{product.title}</h1>
          <img src={product.image} alt=""></img>
          <h3>Price: {product.price}</h3>
          <h3>Rating: {product.rating.rate}</h3>
          <h3>Desciption: {product.description}</h3>
        </>
      )}
      {!product && <h1>Nothing to see here...</h1>}
    </div>
  );
};

export default ProductDetails;
