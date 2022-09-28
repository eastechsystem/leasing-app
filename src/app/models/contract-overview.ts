import { Customer } from "./customer";
import { Vehicle } from "./vehicle";

export interface ContractOverview{
    id?:number;
    contractNumber?: number;
    customer?: Customer;
    vehicle?: Vehicle;
    monthlyRate?:number;
}