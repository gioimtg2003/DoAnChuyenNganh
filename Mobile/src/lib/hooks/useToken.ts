import AsyncStorage, {
    useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
import { STORAGE_KEY } from "../Constant";

export interface IUseToken {
    accessToken: string;
    refreshToken: string;
    exp: number;
}
type UseToken = {
    getAccessToken: () => Promise<string | null>;
    getRefreshToken: () => Promise<string | null>;
    setAccessToken: (token: string) => Promise<void>;
    setRefreshToken: (token: string) => Promise<void>;
    removeToken: () => Promise<void>;
    setExp: (exp: number) => Promise<void>;
    getExp: () => Promise<string | null>;
};

export const useToken = (): UseToken => {
    const getAccessToken = useCallback(async () => {
        let token = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
        return token;
    }, []);

    const getRefreshToken = useCallback(async () => {
        let token = await AsyncStorage.getItem(STORAGE_KEY.REFRESH_TOKEN);
        return token;
    }, []);

    const setAccessToken = useCallback(async (token: string) => {
        await AsyncStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, token);
    }, []);

    const setRefreshToken = useCallback(async (token: string) => {
        await AsyncStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, token);
    }, []);

    const removeToken = useCallback(async () => {
        await AsyncStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
        await AsyncStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN);
        await AsyncStorage.removeItem(STORAGE_KEY.EXP);
    }, []);

    const setExp = useCallback(async (exp: number) => {
        await AsyncStorage.setItem(STORAGE_KEY.EXP, exp.toString());
    }, []);

    const getExp = useCallback(async () => {
        let exp = await AsyncStorage.getItem(STORAGE_KEY.EXP);
        return exp;
    }, []);
    return {
        getAccessToken,
        getRefreshToken,
        setAccessToken,
        setRefreshToken,
        removeToken,
        setExp,
        getExp,
    };
};
