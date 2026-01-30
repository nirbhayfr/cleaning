import { http } from "./http";

export type Product = {
  _id?: string;
  title?: string;
  description?: string;
  category?: string;
  subcategory?: string;
  images: string[];
  price?: string;
  discountPrice?: string;
  quantity?: number;
  inStock: boolean;
  onSale: boolean;
  isTopDeal?: boolean;
};

export type ProductQueryParams = {
  category?: string;
  subCategory?: string;
  search?: string;
};

export const createProduct = async (product: Product) => {
  const res = await http.post("/products", product);

  return res.data;
};

export const getProduct = async ({
  category,
  subCategory,
  search,
}: ProductQueryParams) => {
  const params: ProductQueryParams = {};

  if (category) params.category = category;
  if (subCategory) params.subCategory = subCategory;
  if (search) params.search = search;

  const res = await http.get("/product/getProduct", { params });
  return res.data;
};

export const getAllProducts = async () => {
  const res = await http.get("/products");
  return res.data.products;
};

export const getProductById = async (id: string) => {
  const res = await http.get(`/products/${id}`);

  return res.data;
};

export const toggleProductStatus = async (id: string) => {
  const res = await http.patch(`/products/${id}/toggle-stock`);

  return res.data;
};

export const getSubCategoryProducts = async (subCategoryId: string) => {
  const res = await http.get("/products", {
    params: { subCategory: subCategoryId },
  });
  return res.data.products;
};

export const updateProduct = async (id: string, payload: Partial<Product>) => {
  const res = await http.put(`/products/${id}`, payload);

  console.log(res.data);
  return res.data;
};

export const toggleTopDeal = async (id: string) => {
  const res = await http.patch(`/products/${id}/toggle-top-deal`);

  return res.data;
};

export const deleteProduct = async (id: string) => {
  const res = await http.delete(`/products/${id}`);

  return res.data;
};

export const getTopDeals = async (): Promise<Product[]> => {
  const res = await http.get("/products/top-deals");

  return res.data.products;
};
