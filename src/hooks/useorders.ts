import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	createOrder,
	acceptOrderRequest,
	fetchAllOrders,
	fetchUserAllOrders,
	fetchOrderDetails,
	orderCompleted,
	fetchWorkerOrders,
} from "../api/order";

export const useCreateOrder = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createOrder,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["orders"] });
		},
	});
};

export const useAcceptOrder = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: acceptOrderRequest,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["orders"] });
		},
	});
};

export const useFetchAllOrders = () => {
	return useQuery({
		queryKey: ["orders"],
		queryFn: fetchAllOrders,
	});
};

export const useFetchUserOrders = (userId: string) => {
	return useQuery({
		queryKey: ["orders", userId],
		queryFn: () => fetchUserAllOrders(userId),
		enabled: !!userId,
	});
};

export const useFetchWorkerOrders = (workerId: string) => {
	return useQuery({
		queryKey: ["worker-orders", workerId],
		queryFn: () => fetchWorkerOrders(workerId),
		enabled: !!workerId,
	});
};

export const useFetchOrderDetails = (orderId: string) => {
	return useQuery({
		queryKey: ["order", orderId],
		queryFn: () => fetchOrderDetails(orderId),
		enabled: !!orderId,
	});
};

export const useOrderCompleted = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: orderCompleted,
		onSuccess: (_, orderId) => {
			queryClient.invalidateQueries({ queryKey: ["order", orderId] });
			queryClient.invalidateQueries({ queryKey: ["orders"] });
		},
	});
};
