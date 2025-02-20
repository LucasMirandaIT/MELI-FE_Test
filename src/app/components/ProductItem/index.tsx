import { formatPrice } from "@/utils/format";
import { useCallback } from "react";
import './ProductItem.scss';
import { ProductAPI } from "@/app/interfaces/ProductAPI";
interface ProductItemProps {
  product: ProductAPI;
}
export default function ProductItem({ product }: ProductItemProps) {

  const calculatePercentageOff = useCallback((fullValue: number, discountedValue: number): number => {
    const percentageOff = ((fullValue - discountedValue) / fullValue) * 100;
    return percentageOff;
  }, []);

  const showFreeSending = useCallback((product: ProductAPI) => {
    const freeShipping = product.free_shipping;
    return freeShipping;
  }, []);


  const openProduct = (product: ProductAPI) => {
    // router.push(`/items/${product.id}`);
  };

  return (
    <li className="product-list__item" onClick={() => openProduct(product)}>
      <img src={product.picture} alt={product.title} className="product-list__image" />
      <div className="product-list__info">
        <h3 className="product-list__title">{product.title}</h3>
        <p className="product-list__seller">Por {product.seller}</p>
        {(product.price.amount && product.price.regular_amount) && <p className="product-list__discount-price">
          {formatPrice(product.price.regular_amount, product.price.currency)}
        </p>}
        <p className="product-list__final-price">
          {formatPrice(product.price.amount, product.price.currency)}

          {(product.price.amount && product.price.regular_amount) && <span className="product-list__discount-amount">
            {calculatePercentageOff(product.price.regular_amount, product.price.amount).toFixed(0)}% OFF
          </span>}
        </p>
        {showFreeSending(product) && <p className="product-list__shipping">
          Envio grátis
        </p>}
        {product.condition.toLowerCase() !== 'nuevo' && <p className="product-list__condition">
          {product.condition}
        </p>}
      </div>
    </li>
  );
}