import { AxiosInstance } from "axios";
import { requests } from "../configs/axios";
import { IOrderItem } from "../types/OrderItem";
type IOrderType = "pickup" | "all";

class GetOrder {
    request: AxiosInstance;
    route: string;
    data: IOrderItem[] | undefined;
    constructor(type: IOrderType) {
        this.request = requests();
        this.route =
            type === "pickup" ? "/shipper/order/pickup" : "/shipper/order/all";
    }
    async getOrder() {
        try {
            console.log("get order pickup or all");
            const response = await this.request.get(this.route);
            this.data = response.data.data;
        } catch (error) {
            throw new Error(error as string);
        }
    }
    getDataFromOrder(): IOrderItem[] | undefined {
        return this.data;
    }
}

export default GetOrder;
