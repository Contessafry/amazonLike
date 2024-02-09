/** @format */

export const mapNodes = {
  root: 'root',
} as const;
export type NodeID = (typeof mapNodes)[keyof typeof mapNodes];

export interface Tables<T> {
  [Key: string]: T;
}
export interface User {
  isActive: boolean;
  id: string;
  name: string;
  lastname: string;
  password: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  phone: string;
  isVendor: boolean;
}

export interface Product {
  isAvailable: boolean;
  id: string;
  name: string;
  price: number;
  description: string;
  cover: string;
  category: string;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
}

export interface Order {
  id: string;
  idProducts: Array<Product['id']>;
  idUser: User['id'];
  totalPrice: number;
  date: Date;
  status: 'pending' | 'cancelled' | 'completed';
}

export interface Cart {
  id: string;
}
