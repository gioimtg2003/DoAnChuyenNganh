import { AuthAction, AuthActionType, AuthState } from "./type";

export const reducerAuthHandler = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AuthActionType.LOGIN:
      return {
        isAuthenticated: true,
      };

    case AuthActionType.LOGOUT:
      return {
        isAuthenticated: false,
      };

    case AuthActionType.INITIALIZE:
      return {
        isAuthenticated: action.payload?.isAuthenticated ?? false,
        isLoading: action.payload?.isLoading,
      };

    default:
      return state;
  }
};
