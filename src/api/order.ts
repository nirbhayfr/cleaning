import { http } from "./http";

interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
  date: string;
  time: string;
}

export interface OrderProduct {
  product: string;
  title?: string;
  images?: string[];
  category?: string;
  subcategory?: string;
  price: number;
  quantity: number;
  subtotal?: number;
}

export interface Order {
  _id: string;
  customerId: string;
  takenBy?: string | null;
  products: OrderProduct[];
  shippingAddress: ShippingAddress;
  totalAmount: number;
  isTaken: boolean;
  isCompleted?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderPayload {
  customerId: string;
  shippingAddress: ShippingAddress;
  products: OrderProduct[];
}

interface AcceptOrderPayload {
  orderId: string;
  workerId: string;
}

export const createOrder = async (payload: OrderPayload) => {
  const res = await http.post("/orders/create-order", payload);
  return res.data;
};

export const acceptOrderRequest = async ({
  orderId,
  workerId,
}: AcceptOrderPayload) => {
  const res = await http.post("/orders/accept-order", { orderId, workerId });
  return res.data;
};

export const fetchAllOrders = async () => {
  const res = await http.get("/orders/fetch-orders");
  return res.data.orders;
};

export const fetchUserAllOrders = async (userId: string) => {
  const res = await http.get(`/orders/fetch-orders/${userId}`);
  return res.data.orders;
};

export const fetchWorkerOrders = async (workerId: string) => {
  const res = await http.get(`/orders/fetch-orders/${workerId}`);
  return res.data.orders;
};

export const fetchOrderDetails = async (orderId: string) => {
  const res = await http.get(`/orders/order-detail/${orderId}`);
  return res.data;
};

export const orderCompleted = async (orderId: string) => {
  const res = await http.patch(`/orders/order-completed/${orderId}`);
  return res.data;
};
