export interface Shipper {
  _id: string;
  Name: string;
  Phone: string;
  Email: string;
}

export interface AuthState {
  isAuthenticated?: boolean;
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
