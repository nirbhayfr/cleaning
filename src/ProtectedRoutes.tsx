import { Navigate, Outlet } from "react-router-dom";
import { decryptData } from "./encryption/crypto";
import type { User } from "./api/auth";

type Props = {
	allowedRoles?: Array<"CUSTOMER" | "VENDOR" | "ADMIN">;
};

export default function ProtectedRoute({ allowedRoles }: Props) {
	const stored = localStorage.getItem("user");

	let user: User | null = null;

	if (stored) {
		try {
			user = decryptData(stored) as User;
		} catch {
			user = null;
		}
	}

	// Not logged in
	if (!user) {
		return <Navigate to="/login" replace />;
	}

	console.log(user);
	// Role not allowed
	if (allowedRoles && !allowedRoles.includes(user.role)) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
}
