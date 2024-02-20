import {
  Reducer,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { AuthAction, AuthActionType, AuthContextType, AuthState } from "./type";
import { reducerAuthHandler } from "./reducer";
import { ShopUser } from "../../Types";
import { axiosInstance } from "../../util/axios";

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authContext = createContext<AuthContextType>({
  ...initialState,
  dispatch: () => null,
});

export const useAuth = () => {
  return useContext(authContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [stateAuth, dispatchAuth] = useReducer<Reducer<AuthState, AuthAction>>(
    reducerAuthHandler,
    initialState
  );
  const handleInitialize = useCallback(() => {
    dispatchAuth({
      type: AuthActionType.INITIALIZE,
      payload: { isAuthenticated: false, user: null },
    });
  }, []);

  useEffect(() => {
    (async () => {
      let accToken = localStorage.getItem("aT");
      let exp = localStorage.getItem("exp");

      if (!(accToken && exp)) {
        return handleInitialize();
      }
      try {
        let user = await axiosInstance().get("/user/shop");
        const userData: ShopUser = {
          ...user.data.data,
          Id: user.data.data._id,
        };
        delete userData._id;

        dispatchAuth({
          type: AuthActionType.INITIALIZE,
          payload: { user: userData, isAuthenticated: true },
        });
      } catch {
        handleInitialize();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const valueAuth = useMemo(
    () => ({ ...stateAuth, dispatch: dispatchAuth }),
    [stateAuth, dispatchAuth]
  );
  return (
    <authContext.Provider value={valueAuth}>{children}</authContext.Provider>
  );
};
