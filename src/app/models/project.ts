import {Customer} from './customer';
import {CustomerService} from './customer-service';

export interface Project {
    Id: number;
    Name: string;
    IdCustomer: number;
    Description: string;
    StartDate: Date;
    EndDate: Date;
    ProjectManager: string;
    IdTypeService: number;
    IdTypeSolution: number;
    IdTypeTecnology: number;
    EstimatedEarnings: number;
    Analytics: string;
    PurchaseOrder: string;
    Link: string;
    IdService: number;
    Customer: Customer;
    CustomerService: CustomerService;
}
