import Image from "next/image";
import { useRouter } from "next/navigation";

import { ProductAPI } from "@/interfaces/ProductAPI";
import { formatPrice } from "@/utils/format";

import './ProductItem.scss';
interface ProductItemProps {
  product: ProductAPI;
}
export default function ProductItem({ product }: ProductItemProps) {

  const router = useRouter();

  const calculatePercentageOff = (fullValue: number, discountedValue: number): number => {
    const percentageOff = ((fullValue - discountedValue) / fullValue) * 100;
    return percentageOff;
  };

  const openProduct = (product: ProductAPI) => {
    router.push(`/items/${product.id}`);
  };

  return (
    <li className="product-list__item" onClick={() => openProduct(product)}>
      <Image src={product.picture} alt={product.title} className="product-list__image" width={250} height={250} />
      <div className="product-list__info">
        <h3 className="product-list__title">{product.title}</h3>
        <p className="product-list__seller">Por {product.seller}</p>
        <div className="product-list__price">

          {(product.price.amount && product.price.regular_amount) && <p className="product-list__discount-price">
            {formatPrice(product.price.regular_amount, product.price.currency)}
          </p>}
          <p className="product-list__final-price">
            {formatPrice(product.price.amount, product.price.currency)}

            {(product.price.amount && product.price.regular_amount) && <span className="product-list__discount-amount">
              {calculatePercentageOff(product.price.regular_amount, product.price.amount).toFixed(0)}% OFF
            </span>}
          </p>
        </div>
        {product.free_shipping && <p className="product-list__shipping">
          Envio grátis
        </p>}
        {product.condition.toLowerCase() !== 'nuevo' && <p className="product-list__condition">
          {product.condition}
        </p>}
      </div>
    </li>
  );
}