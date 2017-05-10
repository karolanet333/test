import { CustomersRoutingParamsService } from './../../customers-routing-params.service';
import { Subscription } from 'rxjs/Subscription';
import { CustomersRoutingService } from './../../customers-routing.service';
import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../models/customer-service';
import { Project } from '../../../models/project';
import { Customer } from '../../../models/customer';
import { ServicesCustomerService } from '../../../services/services-customer.service';
import { ProjectsService } from '../../../services/projects.service';

@Component({
  selector: 'service-detail',
  templateUrl: './service-detail.component.html',
  providers: [ ServicesCustomerService, ProjectsService, CustomersRoutingParamsService ]
})
export class ServiceDetailComponent implements OnInit, OnDestroy {
  public _serviceCustomer : CustomerService;
  public _customer : Customer;
  public _projects : Project[] = [];
  private id: number;
  public btnNw: boolean;
  public myForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes

  private idCustomer: number;
  private idService: number;

  //subscriptions
  private projSaveSubscrip: Subscription;
  private paramsSubscrip: Subscription;
  private custSubscrip: Subscription;
  private projsSubscrip: Subscription;

  constructor(
    private route: ActivatedRoute, 
    private servicesCustomer: ServicesCustomerService, 
    private projectsService: ProjectsService, 
    private _fb: FormBuilder,
    private customersRoutingService: CustomersRoutingService,
    private custRoutingParams: CustomersRoutingParamsService
  ) { 
    this.btnNw = false;  
  }

  ngOnInit() {
    /*this.customersRoutingService.showCustomers = true;
    this.customersRoutingService.showCustomerDetail = true;
    this.customersRoutingService.showServices = false;
    this.customersRoutingService.showServiceDetail = true;*/
    this.initParams();
    this.getServiceCustomer();
    this.initForm(0);
  }

  ngOnDestroy(){
    if (this.projSaveSubscrip) this.projSaveSubscrip.unsubscribe();
    if (this.paramsSubscrip) this.paramsSubscrip.unsubscribe();
    if (this.custSubscrip) this.custSubscrip.unsubscribe();
    if (this.projsSubscrip) this.projsSubscrip.unsubscribe();
  }

  save(model: Project, isValid: boolean, modal: any):void {
    this.submitted = true; // set form submit to true
    if(isValid)
    {
      this.projSaveSubscrip = this.projectsService.saveProject(model).subscribe(data => {
        if(data.ok){
          modal.hide();
          this.loadProjects();
        }else{
          console.log(data);
        }
      });
    }
  }

  private initParams():void {
    this.paramsSubscrip = this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
      }
    });

    this.idCustomer = this.custRoutingParams.idCustomer;
    this.idService = this.custRoutingParams.idService;
  }

  private getServiceCustomer():void {
    if(this.id > 0){
      this.custSubscrip = this.servicesCustomer.get(this.id.toString()).subscribe(data => { 
          this._serviceCustomer = data;
          this.btnNw = true;
          this.initForm(this._serviceCustomer.IdCustomer);
          this._customer = this._serviceCustomer["Customer"];
          this.loadProjects();
      });
    }
  }

  /*
  private getCustomer():void {
    if(this.id > 0){
      this.service.get(this._serviceCustomer.IdCustomer.toString()).subscribe(data => { 
            this._customer = data;
      });
    }
  } */

  private initForm(ic : number):void {
    this.myForm = this._fb.group({
      Id: [0, [<any>Validators.nullValidator]],
      Name: ['', [<any>Validators.required, <any>Validators.minLength(2)]],
      IdCustomer: [ic, [<any>Validators.required]],
      Description: ['', [<any>Validators.nullValidator, <any>Validators.minLength(5)]],
      StartDate: [new Date(), [<any>Validators.required]],
      EndDate: [new Date(), [<any>Validators.required]],
      ProjectManager: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
      IdTypeService: [1, [<any>Validators.nullValidator]],
      IdTypeSolution: [2, [<any>Validators.nullValidator]],
      IdTypeTecnology: [2, [<any>Validators.nullValidator]],
      EstimatedEarnings: [0, [<any>Validators.required, <any>Validators.minLength(1)]],
      Analytics: ['', [<any>Validators.nullValidator, <any>Validators.minLength(3)]],
      PurchaseOrder: ['', [<any>Validators.nullValidator, <any>Validators.minLength(3)]],
      Link: ['', [<any>Validators.nullValidator, <any>Validators.minLength(5)]]
    });
  }

  private loadProjects():void {
    this.projsSubscrip = this.projectsService.getAll(this.idCustomer, this.idService).subscribe(data => { 
      this._projects = data;
    });
  }
}
