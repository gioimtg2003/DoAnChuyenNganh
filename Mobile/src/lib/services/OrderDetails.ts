import { AxiosInstance } from "axios";
import { requests } from "../configs/axios";
import { IOrderItem } from "../types/OrderItem";

class GetOrderDetails {
    request: AxiosInstance;
    route: string;
    data: IOrderItem | undefined;
    constructor(id: string) {
        this.request = requests();
        this.route = `/shipper/order/${id}`;
    }
    async getOrder() {
        try {
            const response = await this.request.get(this.route);
            this.data = response.data.data;
        } catch (error) {
            throw new Error(error as string);
        }
    }
    getOrderDetails(): IOrderItem | undefined {
        return this.data;
    }
}

export default GetOrderDetails;
