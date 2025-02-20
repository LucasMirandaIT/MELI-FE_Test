import { IdName, ProductDetails } from "@/interfaces/ProductDetails";

const MAIN_ATTRIBUTES = ["BATTERY_CAPACITY", "INTERNAL_MEMORY", "RAM_MEMORY", "SCREEN_SIZE", "BRAND", "MODEL", "MAIN_COLOR", "CARRIER"];

export const transformProductDetails = (product: ProductDetails, description: string, categoryPath: IdName[]) => {
  const condition = product.attributes.find((attribute) => attribute.id === "ITEM_CONDITION");
  const productId = product.id.split('MLA')[1];
  const finalProduct = {
    id: productId,
    title: product.title,
    price: {
      currency: product.currency_id,
      amount: product.price,
      decimals: 0,
      regular_amount: product.original_price,
    },
    pictures: product.pictures,
    condition: condition?.value_name,
    free_shipping: product.shipping.free_shipping,
    sold_quantity: null, // Data unavailable in API Response - Dado não disponível no Retorno da API
    installments: null,  // Data unavailable in API Response - Dado não disponível no Retorno da API
    description: description,
    attributes: product.attributes.filter((attribute: IdName) => MAIN_ATTRIBUTES.includes(attribute.id)),
    category_path_from_root: categoryPath
  };
  return finalProduct;
};