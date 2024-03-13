import { Action, ActionType, State } from "./type";

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.NOTIFICATION:
            return {
                ...state,
                events: {
                    ...state.events,
                    notification: {
                        type: action.payload?.events.notification.type ?? "",
                        message:
                            action.payload?.events.notification.message ?? "",
                        description:
                            action.payload?.events.notification.description ??
                            "",
                    },
                },
            };
        case ActionType.STATUS_SHIPPER:
            return {
                ...state,
                events: {
                    ...state.events,
                    statusShipper: {
                        id: action.payload?.events.statusShipper.id ?? "",
                        status:
                            action.payload?.events.statusShipper.status ?? "",
                        message:
                            action.payload?.events.statusShipper.message ?? "",
                    },
                },
            };

        default:
            return state;
    }
};
