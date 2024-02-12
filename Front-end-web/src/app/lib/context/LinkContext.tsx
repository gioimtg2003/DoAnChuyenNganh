"use client";

import { Link, Links } from "@/app/ui/components/nav/Links";
import { createContext, useReducer } from "react";

type StateType = typeof Links;

export const enum ActionType {
  SELECT,
}

type ReducerAction = {
  type: ActionType;
  index: number;
};

const reducer = (state: StateType, action: ReducerAction): StateType => {
  switch (action.type) {
    case ActionType.SELECT:
      state.map((link: Link, key: number) => {
        if (key === action.index) {
          link.selected = true;
        } else {
          link.selected = false;
        }
      });
      return [...state];

    default:
      return state;
  }
};

const initState = Links;

export const NavLinkContext = createContext(null as any);
export const NavLinkProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [stateLink, dispatchLink] = useReducer(reducer, initState);
  return (
    <NavLinkContext.Provider value={[stateLink, dispatchLink]}>
      {children}
    </NavLinkContext.Provider>
  );
};
