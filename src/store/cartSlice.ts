import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

export interface CartItem {
	_id: string;
	title: string;
	images: string[];
	price: string;
	discountPrice: string;
	quantity: number;
	inStock: boolean;
	onSale: boolean;
}

export interface CartState {
	items: CartItem[];
	finalPrice: number;
}

// Load cart from localStorage
const loadFromLocalStorage = (): CartItem[] => {
	try {
		const data = localStorage.getItem("cart");
		return data ? JSON.parse(data) : [];
	} catch {
		return [];
	}
};

const initialState: CartState = {
	items: loadFromLocalStorage(),
	finalPrice: 0,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<CartItem>) => {
			const existing = state.items.find(
				(i) => i._id === action.payload._id
			);

			if (existing) {
				existing.quantity += 1;
			} else {
				state.items.push({ ...action.payload, quantity: 1 });
			}

			localStorage.setItem("cart", JSON.stringify(state.items));
			toast.success("Added to Cart");
		},

		removeFromCart: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter(
				(i) => i._id !== action.payload
			);
			localStorage.setItem("cart", JSON.stringify(state.items));
			toast.success("Removed from cart");
		},

		clearCart: (state) => {
			state.items = [];
			localStorage.setItem("cart", JSON.stringify(state.items));
		},

		increaseQty: (state, action: PayloadAction<string>) => {
			const item = state.items.find((i) => i._id === action.payload);
			if (item) item.quantity += 1;

			localStorage.setItem("cart", JSON.stringify(state.items));
		},

		decreaseQty: (state, action: PayloadAction<string>) => {
			const item = state.items.find((i) => i._id === action.payload);
			if (item && item.quantity > 1) {
				item.quantity -= 1;
			}

			localStorage.setItem("cart", JSON.stringify(state.items));
		},
		setFinalPrice: (state, action: PayloadAction<number>) => {
			state.finalPrice = action.payload;
			localStorage.setItem(
				"finalPrice",
				JSON.stringify(state.finalPrice)
			);
		},
	},
});

export const {
	addToCart,
	removeFromCart,
	clearCart,
	increaseQty,
	decreaseQty,
	setFinalPrice,
} = cartSlice.actions;

export default cartSlice.reducer;
