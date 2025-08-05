import axios from "axios";
import { UserType } from "../entities/user/userTypes";

const API_BASE = "http://localhost:5000/api/users";

interface FetchParams {
  page?: number;
  limit?: number;
  sortField?: string;
  sortOrder?: "asc" | "desc";
  email?: string;
  role?: string;
}

// Get users with filters, pagination and sorting
export const fetchUsers = async (params: FetchParams) => {
  const res = await axios.get(API_BASE, { params });
  return res.data;
};

// Create a new user
export const createUser = async (user: Omit<UserType, "_id" | "createdAt" | "updatedAt">) => {
  const res = await axios.post(API_BASE, user);
  return res.data;
};

// Update existing user
export const updateUser = async (id: string, user: Partial<UserType>) => {
  const res = await axios.put(`${API_BASE}/${id}`, user);
  return res.data;
};

// Delete user
export const deleteUser = async (id: string) => {
  const res = await axios.delete(`${API_BASE}/${id}`);
  return res.data;
};
