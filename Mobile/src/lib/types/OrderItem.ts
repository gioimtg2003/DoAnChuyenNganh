export interface IOrderItem {
    _id: string;
    Product: {
        Name: string;
        ImageUrl: string;
    };
    Customer: {
        Name: string;
        Address: string;
    };
    AmountTotal: number;
}
