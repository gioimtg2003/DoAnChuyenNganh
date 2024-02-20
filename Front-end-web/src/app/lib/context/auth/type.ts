import { Dispatch } from "react";
import type { ShopUser } from "../../Types";

export interface AuthState {
  isAuthenticated?: boolean;
  user: ShopUser | null;
  isLoading?: boolean;
}

export enum AuthActionType {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  INITIALIZE = "INITIALIZE",
}

export interface AuthAction {
  type: AuthActionType;
  payload?: AuthState;
}

export interface AuthContextType extends AuthState {
  dispatch: Dispatch<AuthAction>;
}
