import { OrdersInterface } from "./IOrder";
import { StaffsInterface } from "./IStaff";
import { UsersInterface } from "./IUser";

export interface ReturnInterface {
    ID: number,
    OwnerID: number,
    Owner: UsersInterface,
    OrderID: number,
    Order: OrdersInterface,
    StaffID: number;
    Staff: StaffsInterface,
    Reason: string;
    Returndate: Date;
}