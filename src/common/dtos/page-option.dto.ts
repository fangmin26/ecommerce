import { Order } from "../constants/order.enum";

export class PageOptionDto {
    readonly order?:Order = Order.ASC

    readonly page?: number = 1 //javascript default kotlin 비슷

    readonly take?: number = 10

    get skip(): number{
        return (this.page -1) * this.take;
    }
}