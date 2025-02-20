import { Attribute, Product } from "@/interfaces/Product";

export const transformProductsList = (productsList: Product[]) => {
const transformedList = productsList.map((item: Product) => {
  const condition = item.attributes.find((attribute: Attribute) => attribute.id === "ITEM_CONDITION");
  return {
    id: item.id,
    title: item.title,
    price: {
      currency: item.currency_id,
      amount: item.price,
      decimals: 0,
      regular_amount: item.sale_price.regular_amount,
    },
    picture: item.thumbnail,
    condition: condition?.value_name,
    free_shipping: item.shipping.free_shipping,
    seller: item.seller.nickname,
  }
  });
  return transformedList;
};