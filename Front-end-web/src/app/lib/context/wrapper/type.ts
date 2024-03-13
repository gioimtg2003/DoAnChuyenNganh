type statusShipper = "online" | "offline";

export interface State {
    events: {
        notification: {
            type: string;
            message: string;
            description: string;
        };
        statusShipper: {
            id: string;
            status: statusShipper | "";
            message: string;
        };
    };
    trackingShipper?: {
        [id: string]: {
            longitude: number;
            latitude: number;
        };
    };
}

export enum ActionType {
    NOTIFICATION = "NOTIFICATION",
    STATUS_SHIPPER = "STATUS_SHIPPER",
    TRACKING_SHIPPER = "TRACKING_SHIPPER",
}

export interface Action {
    type: ActionType;
    payload?: State;
}
