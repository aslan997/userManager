import { create } from "zustand";
import { UserType } from "./userTypes";

interface UserState {
  selectedUser: UserType | null;
}

export const useUserStore = create<UserState>((set) => ({
  selectedUser: null,
}));
