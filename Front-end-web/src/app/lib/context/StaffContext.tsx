import {
  Reducer,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { Employee, EmployeeActionType, ReducerAction } from "../Types";
import { useFetch } from "../hook/fetch";
import { dateFormat } from "../util/dateFormat";

const initState = (): Employee[] => [];

const reducer = (
  state: Employee[],
  action: ReducerAction<EmployeeActionType, Employee[]>
): Employee[] => {
  switch (action.type) {
    case EmployeeActionType.GET_EMPLOYEE:
      return action.payload;

    case EmployeeActionType.ADD_EMPLOYEE:
      return [...state, ...action.payload];

    default:
      return state;
  }
};

const useStaffContext = (initState: Employee[]) => {
  const [state, dispatch] = useReducer<
    Reducer<Employee[], ReducerAction<EmployeeActionType, Employee[]>>
  >(reducer, initState);
  let GetEmployee = useCallback((employee: Employee[]) => {
    let staffTemp: Employee[] = [];
    employee?.map((item: any) => {
      staffTemp.push({
        Id: item._id,
        Name: item.Name,
        Phone: item.Phone,
        Email: item.Email,
        Address: item.Address,
        Position: item.Position,
        Status: "Offline",
        //Note: client::::CreatedAt | Server::::item.CreateAt,
        CreatedAt: dateFormat(item.CreateAt),
      });
    });
    console.log(staffTemp);
    dispatch({ type: EmployeeActionType.GET_EMPLOYEE, payload: staffTemp });
  }, []);

  return {
    state,
    GetEmployee,
  };
};

type StaffContextType = ReturnType<typeof useStaffContext>;

const initContextState: StaffContextType = {
  state: initState(),
  GetEmployee: (): void => {},
};

const StaffContext = createContext<StaffContextType>(initContextState);

export const useStaff = () => useContext(StaffContext);

export function StaffProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <StaffContext.Provider value={useStaffContext(initState())}>
      {children}
    </StaffContext.Provider>
  );
}
