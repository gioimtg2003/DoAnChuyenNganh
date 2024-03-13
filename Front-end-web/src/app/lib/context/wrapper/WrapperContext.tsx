import {
    Reducer,
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
} from "react";
import { Action, ActionType, State } from "./type";
import { reducer } from "./reducer";
import { getSocket } from "../../service/socket";

const initState: State = {
    events: {
        notification: {
            type: "",
            message: "",
            description: "",
        },
        statusShipper: {
            id: "",
            status: "",
            message: "",
        },
    },
    trackingShipper: {},
};

const useInitValue = () => {
    const [state, dispatch] = useReducer<Reducer<State, Action>>(
        reducer,
        initState
    );
    const socketIO = useMemo(getSocket, []);
    useEffect(() => {
        socketIO.on("connect", () => {
            console.log("connect Socket");
            socketIO.on("shipper_status", (data) => {
                console.log(data);
                dispatch({
                    type: ActionType.STATUS_SHIPPER,
                    payload: {
                        events: {
                            statusShipper: data,
                            notification: {
                                type: "",
                                message: "",
                                description: "",
                            },
                        },
                    },
                });
            });

            socketIO.on("NotificationOrder", (data) => {
                dispatch({
                    type: ActionType.NOTIFICATION,
                    payload: {
                        events: {
                            notification: data,
                            statusShipper: {
                                id: "",
                                status: "",
                                message: "",
                            },
                        },
                    },
                });
            });
        });
    });
    return { state };
};
type WrapperContextType = ReturnType<typeof useInitValue>;
const WrapperContext = createContext<WrapperContextType>({ state: initState });

export const useWrapperContext = () => useContext(WrapperContext);

export const WrapperContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <WrapperContext.Provider value={useInitValue()}>
            {children}
        </WrapperContext.Provider>
    );
};
