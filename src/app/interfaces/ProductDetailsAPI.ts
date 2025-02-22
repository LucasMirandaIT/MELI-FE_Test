export interface ProductDetailsAPI {
    id:                      string;
    title:                   string;
    price:                   Price;
    pictures:                Picture[];
    condition:               string;
    free_shipping:           boolean;
    sold_quantity:           null;
    installments:            null;
    description:             string;
    attributes:              Attribute[];
    category_path_from_root: CategoryPathFromRoot[];
}

export interface Attribute {
    id:         string;
    name:       string;
    value_id:   string;
    value_name: string;
    values:     Value[];
    value_type: string;
}

export interface Value {
    id:     string;
    name:   string;
    struct: Struct | null;
}

export interface Struct {
    number: number;
    unit:   string;
}

export interface CategoryPathFromRoot {
    id:   string;
    name: string;
}

export interface Picture {
    id:         string;
    url:        string;
    secure_url: string;
    size:       string;
    max_size:   string;
    quality:    string;
}

export interface Price {
    currency:       string;
    amount:         number;
    decimals:       number;
    regular_amount: null;
}
