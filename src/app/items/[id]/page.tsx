'use client';

import ImageGallery from "@/components/ImageGallery";
import { useProductDetails } from "@/hooks/useProductDetails";
import { IdName } from "@/interfaces/ProductDetails";
import { formatPrice, showFreeSending } from "@/utils/format";
import { useParams, useRouter } from "next/navigation";

import './ProductDetails.scss';
import { Attribute } from "@/interfaces/Product";
import { Button, Skeleton } from "@mui/material";
import MessageSnackbar from "@/components/MessageSnackbar";
import { useState } from "react";

function SkeletonLoading() {
  return (
    <>
      <Skeleton variant="text" width={'95%'} sx={{ fontSize: '2.5rem', width: '95%', maxWidth: '1300px', margin: '0 auto' }} />
      <div className="product__content h-[80vh] w-[95%] max-w-[1300px] mx-auto">
        <Skeleton variant="rectangular" width={'80%'} height={'100%'} sx={{ marginTop: '10px', marginLeft: '10%' }} />

        <Skeleton variant="rectangular" width={'80%'} height={'70%'} sx={{ marginTop: '10px', marginLeft: '2%' }} />
      </div>
    </>
  )
}

export default function ItemById() {
  const { id } = useParams();
  const router = useRouter();
  const { product } = useProductDetails(id as string);
  const [snackbarBuy, setSnackbarBuy] = useState({ isOpen: false, productName: '' });

  const clickBreadcrumb = (itemId: string) => {
    console.log('clickBreadcrumb ::: ', itemId);
  }

  const buyProduct = (productName: string) => {
    setSnackbarBuy({ isOpen: true, productName: productName });
  }

  if (!product) return <SkeletonLoading />;

  return (
    <section className="product">
      <div className="product__header">
        <a className="product__header__back" onClick={() => router.back()}>Volver al listado</a>
        <ul className="product__header__breadcrumb">
          {product.category_path_from_root?.map((item: IdName) => (
            <li key={`breadcrumb-${item.id}`} onClick={() => clickBreadcrumb(item.id)}>{item.name}</li>
          ))}
        </ul>

        <p className="product__header__listing-id">Publicación: <b>#{product.id}</b></p>
      </div>
      <div className="product__content">
        {product.pictures && <ImageGallery images={product.pictures} />}
        <div>
          <p className="product__content__condition">{product.condition}</p>
          <h1 className="product__content__product-name">{product.title}</h1>
          {!!product.price.regularAmount && (
            <p className="product__content__regular-price">{formatPrice(product.price.regularAmount, product.price.currency)}</p>
          )}
          <p className="product__content__price">{formatPrice(product.price.amount, product.price.currency)}</p>
          {showFreeSending(product) && <p className="product__content__shipping">Envío gratis</p>}
          <Button className="product__content__buy-btn" variant="contained" onClick={() => buyProduct(product.title)}>Comprar Ahora</Button>
          {product.attributes.map((attribute: Attribute) => (
            <p className="product__content__attribute" key={attribute.id}>{attribute.name}: <b>{attribute.value_name}</b></p>
          ))}
        </div>
        <hr className="product__divider" />
        <div className="product__description">
          <h2 className="product__description__title">Descripción</h2>
          <p className="product__description__content">{product.description}</p>
        </div>
      </div>

      <MessageSnackbar
        isOpen={snackbarBuy.isOpen}
        message={`¡Compraste ${snackbarBuy.productName}!`}
        severity="success"
        handleClose={() => setSnackbarBuy({ isOpen: false, productName: '' })} />
    </section>
  );
}
