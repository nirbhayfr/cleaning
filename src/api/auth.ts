import { http } from "./http";

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

export interface User {
  _id: string; // ✅ MUST exist
  email: string;

  role: "CUSTOMER" | "ADMIN" | "VENDOR";
}

/* REGISTER */
export const registerUser = async (payload: RegisterPayload) => {
  if (payload.password !== payload.confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const res = await http.post("/auth/signup", {
    name: payload.name,
    email: payload.email,
    password: payload.password,
  });

  return res.data;
};

/* LOGIN */
export const loginUser = async (payload: LoginPayload) => {
  const res = await http.post("/auth/login", payload);

  // 🔥 VERY IMPORTANT
  localStorage.setItem("token", res.data.token);

  return res.data;
};
