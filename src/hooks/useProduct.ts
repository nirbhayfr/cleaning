import { useMutation, useQuery } from "@tanstack/react-query";
import {
	createProduct,
	getProduct,
	getAllProducts,
	getProductById,
	toggleProductStatus,
	getSubCategoryProducts,
	updateProduct,
	deleteProduct,
} from "../api/product";
import type { Product, ProductQueryParams } from "../api/product";
import { useQueryClient } from "@tanstack/react-query";

export const useCreateProduct = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
	});
};

export const useGetProducts = (params: ProductQueryParams) => {
	return useQuery({
		queryKey: ["products", params],
		queryFn: () => getProduct(params),
	});
};

export const useGetAllProducts = () => {
	return useQuery({
		queryKey: ["products"],
		queryFn: getAllProducts,
	});
};

export const useGetProductById = (id: string) => {
	return useQuery({
		queryKey: ["product", id],
		queryFn: () => getProductById(id),
		enabled: !!id,
	});
};

export const useToggleProductStatus = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: toggleProductStatus,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
	});
};

export const useSubCategoryProducts = (id: string) => {
	return useQuery({
		queryKey: ["subCategoryProducts", id],
		queryFn: () => getSubCategoryProducts(id),
		enabled: !!id,
	});
};

export const useUpdateProduct = (id: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: Partial<Product>) => updateProduct(id, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["product", id] });
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
	});
};

export const useDeleteProduct = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
	});
};
