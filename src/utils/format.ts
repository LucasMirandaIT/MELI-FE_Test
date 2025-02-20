import { ProductAPI } from "@/interfaces/ProductAPI";

export const formatPrice = (value: number, currency: string) => {
    return value.toLocaleString('es-AR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  }

export const showFreeSending = (product: ProductAPI) => {
  const freeShipping = product.free_shipping;
  return freeShipping;
};