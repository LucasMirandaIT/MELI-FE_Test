'use client';

import { Skeleton } from "@mui/material";
import { useParams, useRouter } from "next/navigation";

import ProductDetails from "@/components/ProductDetails";
import { useProductDetails } from "@/hooks/useProductDetails";
import { IdName } from "@/interfaces/ProductDetails";

import './ItemById.scss';

function SkeletonLoading() {
  return (
    <>
      <Skeleton variant="text" width={'95%'} sx={{ fontSize: '2.5rem', width: '95%', maxWidth: '1200px', margin: '0 auto' }} />
      <div className="product__content h-[80vh] w-[95%] max-w-[1200px] mx-auto">
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

  const clickBreadcrumb = (itemId: string) => {
    console.log('clickBreadcrumb ::: ', itemId);
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
        <ProductDetails product={product} />
    </section>
  );
}
