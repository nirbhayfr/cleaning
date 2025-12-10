export type RegisterPayload = {
	name: string;
	email: string;
	password: string;
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

import { http } from "./http";

export const registerUser = async (payload: RegisterPayload) => {
	const res = await http.post("/register", payload);
	return res.data;
};

export const loginUser = async (payload: LoginPayload) => {
	const res = await http.post("/login", payload);
	return res.data;
};

export const getUserProfile = async (id: string): Promise<UserProfile> => {
	const res = await http.get(`/profile/${id}`);
	return res.data;
};
