export type UserStatus = "active" | "banned";

export interface UserType {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}
