export type CategoryPayload = {
	title: string;
	key: string;
	image?: string;
};

export type SubCategoryPayload = {
	title: string;
	image?: string;
	category: string;
	key: string;
};

export type SubCategory = {
	_id: string;
	title: string;
	key: string;
	image?: string;
	isActive: boolean;
	category: string;
};

export interface Category {
	_id: string;
	key: string;
	title: string;
	image: string;
	isActive: boolean;
	subCategory: SubCategory[];
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export type ApiResponse = {
	status: number;
	data: object;
	message: string;
};

import { http } from "./http";

export const createCategory = async (payload: CategoryPayload) => {
	const res = await http.post("/category/create-category", payload);
	console.log(res.data);
	return res.data;
}; 

export const createSubCategory = async (payload: SubCategoryPayload) => {
	const res = await http.post("/category/create-subCategory", payload);
	console.log(res.data);
	return res.data;
};

export const fetchAllCategories = async (): Promise<Category[]> => {
	const res = await http.get("/category/fetchAllCategory");
	return res.data.data;
};

export const fetchSubCategories = async (
	categoryId: string
): Promise<SubCategory[]> => {
	const res = await http.get(`/category/fetchSubCategory/${categoryId}`);
	return res.data.data;
};

export const toggleCategoryStatus = async (
	categoryId: string
): Promise<ApiResponse> => {
	const res = await http.get(`/category/disableCategory/${categoryId}`);
	return res.data;
};

export const toggleSubCategoryStatus = async (
	subCategoryId: string
): Promise<ApiResponse> => {
	const res = await http.get(
		`/category/disableSubCategory/${subCategoryId}`
	);
	console.log(res.data);
	return res.data;
};
