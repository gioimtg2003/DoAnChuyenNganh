import React, {
    Reducer,
    createContext,
    useCallback,
    useContext,
    useReducer,
} from "react";
import { AuthAction, AuthActionType, AuthState } from "./type";
import { reducerAuthHandler } from "./reducer";
import { useToken, IUseToken } from "../../hooks/useToken";

const initialState: AuthState = {
    isAuthenticated: false,
    isLoading: true,
};

const AuthSource = () => {
    const [state, dispatch] = useReducer<Reducer<AuthState, AuthAction>>(
        reducerAuthHandler,
        initialState
    );
    const { setAccessToken, setRefreshToken, setExp, removeToken } = useToken();

    const handleInitialize = useCallback(() => {
        dispatch({
            type: AuthActionType.INITIALIZE,
            payload: { isAuthenticated: false, isLoading: false },
        });
    }, []);

    const handleLogin = useCallback(async (token: IUseToken) => {
        try {
            await setAccessToken(token.accessToken);
            await setRefreshToken(token.refreshToken);
            await setExp(token.exp);
            dispatch({
                type: AuthActionType.LOGIN,
                payload: { isAuthenticated: true, isLoading: true },
            });
        } catch (error) {
            dispatch({
                type: AuthActionType.INITIALIZE,
                payload: { isAuthenticated: false, isLoading: false },
            });
            console.log(error);
        }
    }, []);

    const handleLogout = useCallback(async () => {
        try {
            await removeToken();
            dispatch({
                type: AuthActionType.LOGOUT,
                payload: { isAuthenticated: false, isLoading: false },
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return { state, handleInitialize, handleLogin, handleLogout };
};

const AuthContext = createContext<ReturnType<typeof AuthSource>>({} as any);

function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
}

const AuthProvider = ({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element => {
    return (
        <AuthContext.Provider value={AuthSource()}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, useAuth };
