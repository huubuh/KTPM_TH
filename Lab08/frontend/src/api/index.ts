import axios from "axios";

const PRODUCT_API = "http://192.168.0.101:8081";
const CART_API = "http://192.168.0.101:8082";
const ORDER_API = "http://192.168.0.101:8083";

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Order {
  orderId: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
}

//  Product
export const productApi = {
  getAll: async (): Promise<Product[]> => {
    const res = await axios.get(`${PRODUCT_API}/products`);
    return res.data.data || [];
  },

  getById: async (id: string): Promise<Product> => {
    const res = await axios.get(`${PRODUCT_API}/products/${id}`);
    return res.data.data;
  },
};

//Cart
export const cartApi = {
  get: async (userId: string): Promise<CartItem[]> => {
    const res = await axios.get(`${CART_API}/cart?userId=${userId}`);
    return res.data.data || [];
  },

  add: async (
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<void> => {
    await axios.post(`${CART_API}/cart/add`, { userId, productId, quantity });
  },
};

// Order
export const orderApi = {
  checkout: async (userId: string): Promise<Order> => {
    const res = await axios.post(`${ORDER_API}/checkout`, { userId });
    return res.data.order;
  },
};
