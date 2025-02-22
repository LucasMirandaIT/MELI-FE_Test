import { Button } from "@mui/material";
import { useState } from "react";

import ImageGallery from "@/components/ImageGallery";
import MessageSnackbar from "@/components/MessageSnackbar";
import { formatPrice } from "@/utils/format";

import './ProductDetails.scss';

import { ProductDetailsAPI, Attribute } from "@/interfaces/ProductDetailsAPI";

interface ProductDetailsProps {
  product: ProductDetailsAPI;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [snackbarBuy, setSnackbarBuy] = useState({ isOpen: false, productName: '' });

  const buyProduct = (productName: string) => {
    setSnackbarBuy({ isOpen: true, productName: productName });
  }

  return (
    <>
      <div className="product__content">
        {product.pictures && (
          <ImageGallery images={product.pictures} />
        )}
        <div>
          <p className="product__content__condition">{product.condition} | N/A vendidos</p>
          <h1 className="product__content__product-name">{product.title}</h1>
          <h1 className="product__content__seller">Por N/A</h1>
          {!!product.price.regular_amount && (
            <p className="product__content__regular-price">{formatPrice(product.price.regular_amount, product.price.currency)}</p>
          )}
          <p className="product__content__price">{formatPrice(product.price.amount, product.price.currency)}</p>
          <p className="product__content__installments">Mismo precio en N/A cuotas de N/A</p>
          {product.free_shipping && <p className="product__content__shipping">Envío gratis</p>}
          <Button className="product__content__buy-btn" variant="contained" onClick={() => buyProduct(product.title)}>Comprar Ahora</Button>
          {product.attributes.map((attribute: Attribute) => (
            <p className="product__content__attribute" key={attribute.id}>{attribute.name}: <b>{attribute.value_name}</b></p>
          ))}
        </div>
        <hr className="product__divider" />
        <div className="product__description">
          <h2 className="product__description__title">Descripción</h2>
          <p className="product__description__content">{product.description || 'N/A'}</p>
        </div>
      </div>
      <MessageSnackbar
        isOpen={snackbarBuy.isOpen}
        message={`¡Compraste ${snackbarBuy.productName}!`}
        severity="success"
        handleClose={() => setSnackbarBuy({ isOpen: false, productName: '' })} />
    </>
  )
}