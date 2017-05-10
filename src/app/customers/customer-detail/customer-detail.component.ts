import { CustomersRoutingParamsService } from './../customers-routing-params.service';
import { Subscription } from 'rxjs/Subscription';
import { CustomersRoutingService } from './../customers-routing.service';
import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../models/customer-service';
import { ServicesCustomerService } from '../../services/services-customer.service';

@Component({
  selector: 'customer-detail',
  templateUrl: './customer-detail.component.html',
  providers: [ServicesCustomerService, CustomersRoutingParamsService]
})
export class CustomerDetailComponent implements OnInit, OnDestroy {
  public _customer: Customer;
  public _servicesCustomer: CustomerService[] = [];
  public _copyservicesCustomer: CustomerService[] = [];
  public selectedType : number;
  private id: number;
  public myForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes

  //subscriptions
  private servCustSubscrip: Subscription;
  private initParamsSubscrip: Subscription;
  private servCustSaveSubscrip: Subscription;

  constructor(
    private route: ActivatedRoute, 
    private servicesCustomer: ServicesCustomerService, 
    private _fb: FormBuilder,
    private customersRoutingService: CustomersRoutingService) { 
    this.selectedType = 0;
  }

  ngOnInit() {
    /*this.customersRoutingService.showCustomers = true;
    this.customersRoutingService.showCustomerDetail = true;
    this.customersRoutingService.showServices = false;
    this.customersRoutingService.showServiceDetail = false;*/
    this.initParams();
    this.loadServiceCustomer(); 
    this.initForm(); 
  }

  ngOnDestroy(){
    if (this.servCustSubscrip) this.servCustSubscrip.unsubscribe();
    if (this.initParamsSubscrip) this.initParamsSubscrip.unsubscribe();
    if (this.servCustSaveSubscrip) this.servCustSaveSubscrip.unsubscribe();
  }

  filter():void {
    let filter = this.selectedType;
    if(filter != 0){
      let filterList = this._copyservicesCustomer.filter(item => item.IdStatus == filter);
      this._servicesCustomer = filterList;
    }else{
      this._servicesCustomer = this._copyservicesCustomer;
    }
  }

  save(model: CustomerService, isValid: boolean, modal: any):void {
    this.submitted = true; // set form submit to true
    if(isValid)
    {
        this.servCustSaveSubscrip = this.servicesCustomer.save(model).subscribe(data => {
          if(data.ok){
            modal.hide();
            this.loadServiceCustomer();
          }
        })
    }
  }

  private initParams():void {
    this.initParamsSubscrip = this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
      }
    });
  }

  /*
  private getCustomer():void {
    if(this.id > 0){
      this.service.get(this.id.toString()).subscribe(data => { 
            this._customer = data;
            this.loadServiceCustomer();
      });
    }
  } */

  private initForm():void {
    this.myForm = this._fb.group({
      Id: [0, [<any>Validators.nullValidator]],
      Name: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
      IdStatus: [1, [<any>Validators.required]],
      IdCustomer: [this.id, [<any>Validators.required]],
      Description: ['', [<any>Validators.nullValidator, <any>Validators.minLength(5)]],
      StartDate: [new Date(), [<any>Validators.required]],
      EndDate: [new Date(), [<any>Validators.required]]
    });
  }

  private loadServiceCustomer():void {
    this.servCustSubscrip = this.servicesCustomer.getAll(this.id.toString()).subscribe(data => { 
      this._servicesCustomer = data;
      this._copyservicesCustomer = data;
      this._customer = this._copyservicesCustomer[0]["Customer"];
    });
  }

}
