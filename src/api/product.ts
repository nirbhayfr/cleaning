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
};

export type ProductQueryParams = {
	category?: string;
	subCategory?: string;
	search?: string;
};

export const createProduct = async (product: Product) => {
	const res = await http.post("/product/create-product", product);
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
	const res = await http.get("/product/getAllProduct");
	return res.data.data;
};

export const getProductById = async (id: string) => {
	const res = await http.get(`/product/product-details/${id}`);
	return res.data;
};

export const toggleProductStatus = async (id: string) => {
	const res = await http.get(`/product/product-disable/${id}`);
	return res.data;
};

export const getSubCategoryProducts = async (id: string) => {
	const res = await http.get(`/product/getSubCategoryProducts/${id}`);
	return res.data;
};

export const updateProduct = async (id: string, payload: Partial<Product>) => {
	const res = await http.put(`/product/update-product/${id}`, payload);
	console.log(res.data);
	return res.data;
};

export const deleteProduct = async (id: string) => {
	const res = await http.delete(`/product/delete-product/${id}`);
	return res.data;
};
