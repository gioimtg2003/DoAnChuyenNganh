import { CommonActions, useNavigation } from "@react-navigation/native";
import { useAuth } from "../Auth/AuthContext";
import React, { useEffect } from "react";
import { useToken } from "../../hooks/useToken";

export const ProtectProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { state } = useAuth();
  const { getAccessToken, getRefreshToken, getExp } = useToken();
  const navigation = useNavigation();

  (async () => {
    const accessToken = await getAccessToken();
    const refreshToken = await getRefreshToken();
    const exp = await getExp();
    if (!(state.isAuthenticated && accessToken && refreshToken && exp)) {
    }
  })();

  return <>{children}</>;
};

export const ProtectLogin: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { state } = useAuth();
  const { getAccessToken, getRefreshToken, getExp } = useToken();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const accessToken = await getAccessToken();
      const refreshToken = await getRefreshToken();
      const exp = await getExp();
      if (state.isAuthenticated && accessToken && refreshToken && exp) {
        navigation.dispatch(
          CommonActions.navigate({
            name: "Home",
          })
        );
      }
    })();
  }, [state.isAuthenticated]);

  return <>{children}</>;
};
