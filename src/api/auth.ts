export type RegisterPayload = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
};

export type LoginPayload = {
	email: string;
	password: string;
};

export type UserProfile = {
	id: string;
	name: string;
	email: string;
};
export interface User {
	_id: string;
	name: string;
	email: string;
	role: "CUSTOMER" | "ADMIN" | "VENDOR";
	createdAt: string;
	updatedAt: string;
	__v: number;
}

import { http } from "./http";

export const registerUser = async (payload: RegisterPayload) => {
	const res = await http.post("/auth/register", payload);
	return res.data;
};

export const loginUser = async (payload: LoginPayload) => {
	const res = await http.post("/auth/login", payload);
	return res.data;
};

export const getUserProfile = async (id: string): Promise<UserProfile> => {
	const res = await http.get(`/auth/profile/${id}`);
	return res.data;
};
