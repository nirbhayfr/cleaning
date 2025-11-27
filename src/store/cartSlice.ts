import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
	id: string;
	title: string;
	images: string[];
	price: string;
	discountPrice: string;
	quantity: number;
}

export interface CartState {
	items: CartItem[];
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
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<CartItem>) => {
			const existing = state.items.find(
				(i) => i.id === action.payload.id
			);

			if (existing) {
				existing.quantity += 1;
			} else {
				state.items.push({ ...action.payload, quantity: 1 });
			}

			localStorage.setItem("cart", JSON.stringify(state.items));
		},

		removeFromCart: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter((i) => i.id !== action.payload);
			localStorage.setItem("cart", JSON.stringify(state.items));
		},

		clearCart: (state) => {
			state.items = [];
			localStorage.setItem("cart", JSON.stringify(state.items));
		},

		increaseQty: (state, action: PayloadAction<string>) => {
			const item = state.items.find((i) => i.id === action.payload);
			if (item) item.quantity += 1;

			localStorage.setItem("cart", JSON.stringify(state.items));
		},

		decreaseQty: (state, action: PayloadAction<string>) => {
			const item = state.items.find((i) => i.id === action.payload);
			if (item && item.quantity > 1) {
				item.quantity -= 1;
			}

			localStorage.setItem("cart", JSON.stringify(state.items));
		},
	},
});

export const {
	addToCart,
	removeFromCart,
	clearCart,
	increaseQty,
	decreaseQty,
} = cartSlice.actions;

export default cartSlice.reducer;
