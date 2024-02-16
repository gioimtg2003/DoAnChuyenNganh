export interface User {
  Name: string;
  Email: string;
  Phone: string;
  Address: string;
}

export interface Employee extends User {
  Id: string;
  Position: string;
  income?: number | 0;
  Status: string | "Offline";
  CreatedAt: string;
  getDetail?: () => void;
}

export interface OptionsDatagridView {
  gridType: string;
  row?: {
    /**
     * Height of row
     * 14-16-20-24
     */
    height: number;
  };
}

export interface AddEmployeeFieldType {
  firstName: string;
  lastName: string;
  position: string;
  Phone: string;
  Email: string;
  Address: string;
}

export interface ShopUser extends User {
  _id?: string;
  Id: string;
  ShopName: string;
  ShopAddress: string;
}

export interface ResponseSuccess {
  code: number;
  status: string;
  message: string;
  data: any;
}
export interface ResponseError {
  code: number;
  message: string;
}
/**
 * Type of login state
 */
export interface ILogin {
  isLogin: boolean;
}

export enum LoginActionType {
  LOGOUT,
}
/**
 * Type of  action
 */
export type ReducerAction<T, V> = {
  type: T;
  payload: V;
};

export enum UserActionType {
  GET_PROFILE,
  UPDATE_PROFILE,
  UPDATE_PASSWORD,
  ADD_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  GET_PRODUCT,
  DELETE_PRODUCT,
  ADD_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER,
  GET_ORDER,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORY,
}
