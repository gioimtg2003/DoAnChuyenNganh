import { AxiosInstance } from "axios";
import { requests } from "../configs/axios";
import { IOrderItem } from "../types/OrderItem";

class PickupOrder {
    request: AxiosInstance;
    route: string;
    data: IResponseApi<boolean> | undefined;
    id: string;
    constructor(id: string) {
        this.request = requests();
        this.route = "/shipper/order/pickup";
        this.id = id;
    }
    async PickupOrder(): Promise<boolean> {
        try {
            const response = await this.request.post(this.route, {
                id: this.id,
            });
            this.data = response.data;
            if (this.data?.code == 200) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            throw new Error(error as string);
        }
    }
}

export default PickupOrder;
