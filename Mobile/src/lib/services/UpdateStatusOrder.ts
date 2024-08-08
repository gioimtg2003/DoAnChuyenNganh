import { AxiosInstance } from "axios";
import { requests } from "../configs/axios";
import { IOrderItem } from "../types/OrderItem";
type status = "cancel" | "complete";
class UpdateStatusOrder {
    request: AxiosInstance;
    route: string;
    data: IResponseApi<boolean> | undefined;
    constructor(type: status) {
        this.request = requests();
        this.route = `/shipper/order/${type}`;
    }
    async updateOrder(id: string): Promise<boolean> {
        try {
            const response = await this.request.post(this.route, {
                id: id,
            });
            this.data = response.data;
            if (this.data?.code !== 200) {
                return false;
            }
            return true;
        } catch (error) {
            throw new Error(error as string);
        }
    }
}

export default UpdateStatusOrder;
