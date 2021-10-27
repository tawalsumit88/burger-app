export interface Ingredient {
  name: string;
  field: string;
  price: number;
  type: 'decider' | 'units';
  quantity?: 0;
  decider?: false;
}

export interface Product {
  id: number;
  productName: string;
  description: string;
  basePrise: number;
  total: number;
  ingredients: Array<Ingredient>;
}
