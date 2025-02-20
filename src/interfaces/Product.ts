interface SalePrice {
    "price_id": string,
    "amount": number,
    "conditions": {
      "eligible": boolean,
      "context_restrictions": string[],
      "start_time": string,
      "end_time": string
    },
    "currency_id": string,
    "exchange_rate": null,
    "payment_method_prices": [],
    "payment_method_type": string,
    "regular_amount": number,
    "type": string,
    "metadata": {
      "promotion_type": string,
      "campaign_id": string,
      "promotion_id": string
    }
  }
  
  interface Shipping {
    "store_pick_up": boolean,
    "free_shipping": boolean,
    "logistic_type": string,
    "mode": string,
    "tags": string[],
    "benefits": null,
    "promise": null,
    "shipping_score": number
  }
  
  export interface Attribute {
    "id": string,
    "name": string,
    "value_id": string,
    "value_name": string,
    "attribute_group_id": string,
    "attribute_group_name": string,
    "value_struct": null,
    "values": Array<{
      "id": string,
      "name": string,
      "struct": null,
      "source": number
    }>,
    "source": number,
    "value_type": string
  }
  
  interface Installments {
    "quantity": number,
    "amount": number,
    "rate": number,
    "currency_id": string,
    "metadata": {
        "meliplus_installments": boolean,
        "additional_bank_interest": boolean
    }
  }
  
  export interface Product {
    id: string,
    title: string,
    condition: string,
    listingId?: string,
    thumbnail_id: string,
    catalog_product_id: string,
    listing_type_id: string,
    sanitized_title: string,
    permalink: string,
    buying_mode: string,
    site_id: string,
    category_id: string,
    domain_id: string,
    thumbnail: string,
    currency_id: string,
    order_backend: number,
    price: number,
    original_price: number,
    sale_price: SalePrice,
    available_quantity: number,
    official_store_id: number,
    use_thumbnail_id: boolean,
    accepts_mercadopago: boolean,
    shipping: Shipping,
    stop_time: string,
    seller: {
      id: number,
      nickname: string
    },
    address: {
      state_id: string,
      state_name: string,
      city_id: string,
      city_name: string
    },
    attributes: Attribute[],
    installments: Installments,
    winner_item_id: null,
    catalog_listing: boolean,
    discounts: null,
    promotion_decorations: null,
    promotions: null,
    inventory_id: string,
    installments_motors: null,
  }