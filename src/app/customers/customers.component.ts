import { CustomersRoutingService } from './customers-routing.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ng2-bootstrap/modal/modal.component';
import { Customer } from '../models/customer';
import { CustomersService } from '../services/customers.service';

@Component({
    selector: 'customers',
    templateUrl: 'customers.component.html',
    providers: [CustomersService, CustomersRoutingService]
})

export class CustomersComponent implements OnInit {
    public searchTerm: string;
    public _customers: Customer[] = [];
    private _customersCopy: Customer[] = [];
    public myForm: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    public events: any[] = []; // use later to display form changes

    constructor(private service: CustomersService, private _fb: FormBuilder, private customersRoutingService: CustomersRoutingService){ }

    ngOnInit(){
        /*this.customersRoutingService.showCustomers = true;
        this.customersRoutingService.showCustomerDetail = false;
        this.customersRoutingService.showServices = false;
        this.customersRoutingService.showServiceDetail = false;*/
        this.loadData();
    }

    search():void {
        let term = this.searchTerm;
        let listfilters = this._customersCopy.filter(item => item.Name.toLowerCase().indexOf(term.toLowerCase()) > -1);
        this._customers = listfilters;
    }

    private loadData():void {
        this.service.getAll().subscribe(data => { 
            this._customers = data;
            this._customersCopy = data; 
        });
    }
}
