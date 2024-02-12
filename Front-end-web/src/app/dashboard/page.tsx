"use client";

import { useContext, useEffect, useReducer } from "react";
import { NavWeb } from "../ui/components/nav/NavWeb";
import { NavLinkContext } from "../lib/context/LinkContext";
import { selectedPage } from "../lib/util/selectedPage";

// Định nghĩa kiểu cho state
type StateType = {
  data: string;
};

const _dispatch = (state: StateType, data: any): StateType => {
  switch (data.type) {
    case "FETCH_DATA":
      return data.payload;
    case "SET_DATA":
      return { ...state, data: data.payload };
    default:
      return state;
  }
};

export default function Dashboard(): JSX.Element {
  const [state, dispatch] = useReducer(_dispatch, {
    data: "",
  });
  const [stateLink, dispatchLink] = useContext(NavLinkContext);
  useEffect(() => {
    console.log(stateLink);
    selectedPage(dispatchLink, 0);
  }, []);

  return (
    <div>
      LinkP
      <p>helllo</p>
      <input
        className="w-1/2 p-2 border-2 border-gray-300 rounded-md"
        type="text"
        value={state?.data}
        onChange={(e) => {
          dispatch({ type: "SET_DATA", payload: e.target.value });
        }}
      />
      <p>{state?.data}</p>
    </div>
  );
}
