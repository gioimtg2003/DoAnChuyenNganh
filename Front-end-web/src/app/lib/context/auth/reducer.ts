import { AuthAction, AuthActionType, AuthState } from "./type";

export const reducerAuthHandler = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AuthActionType.LOGIN:
      return {
        isAuthenticated: true,
        user: action.payload?.user ?? null,
      };

    case AuthActionType.LOGOUT:
      return {
        isAuthenticated: false,
        user: null,
      };

    case AuthActionType.INITIALIZE:
      return {
        isAuthenticated: action.payload?.isAuthenticated ?? false,
        user: action.payload?.user ?? null,
        isLoading: action.payload?.isLoading,
      };

    default:
      return state;
  }
};
