import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
	createCategory,
	createSubCategory,
	fetchAllCategories,
	fetchSubCategories,
	toggleCategoryStatus,
	toggleSubCategoryStatus,
} from "../api/category";
import type {
	CategoryPayload,
	SubCategoryPayload,
	Category,
	SubCategory,
	ApiResponse,
} from "../api/category";

// Fetch all categories
export const useFetchAllCategories = () =>
	useQuery<Category[], Error>({
		queryKey: ["categories"],
		queryFn: fetchAllCategories,
	});

// Create a new category
export const useCreateCategory = () => {
	const queryClient = useQueryClient();

	return useMutation<Category, Error, CategoryPayload>({
		mutationFn: (payload: CategoryPayload) => createCategory(payload),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["categories"] }),
	});
};

// Toggle category status
export const useToggleCategoryStatus = () => {
	const queryClient = useQueryClient();

	return useMutation<ApiResponse, Error, string>({
		mutationFn: (categoryId: string) => toggleCategoryStatus(categoryId),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["categories"] }),
	});
};

// Fetch subcategories by categoryId
export const useFetchSubCategories = (categoryId: string) =>
	useQuery<SubCategory[], Error>({
		queryKey: ["subcategories", categoryId],
		queryFn: () => fetchSubCategories(categoryId),
		enabled: !!categoryId,
	});

// Create a new subcategory
export const useCreateSubCategory = () => {
	const queryClient = useQueryClient();

	return useMutation<SubCategory, Error, SubCategoryPayload>({
		mutationFn: (payload: SubCategoryPayload) =>
			createSubCategory(payload),
		onSuccess: (_, payload) =>
			queryClient.invalidateQueries({
				queryKey: ["subcategories", payload.category],
			}),
	});
};

// Toggle subcategory status
export const useToggleSubCategoryStatus = () => {
	const queryClient = useQueryClient();

	return useMutation<ApiResponse, Error, string>({
		mutationFn: (id: string) => toggleSubCategoryStatus(id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["subcategories"],
			});
		},
	});
};
