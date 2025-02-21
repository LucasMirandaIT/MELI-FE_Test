export interface ProductAPI {
  id: string;
  title: string;
  price: Price;
  picture: string;
  condition: Condition;
  free_shipping: boolean;
  seller: string;
}

export enum Condition {
  Nuevo = "Nuevo",
  Reacondicionado = "Reacondicionado",
  Usado = "Usado"
}

export interface Price {
  currency: Currency;
  amount: number;
  decimals: number;
  regular_amount: number | null;
}

export enum Currency {
  Ars = "ARS",
}
