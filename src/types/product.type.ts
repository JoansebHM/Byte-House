export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  brand: string;
  images?: string[];
  stock: number;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  description?: string;
}
