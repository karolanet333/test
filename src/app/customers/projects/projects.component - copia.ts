/*import { Subscription } from 'rxjs/Subscription';
import { CustomersRoutingService } from './../customers-routing.service';
import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../models/customer-service';
import { Project } from '../../models/project';
import { Customer } from '../../models/customer';
import { ServicesCustomerService } from '../../services/services-customer.service';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {

 public _serviceCustomer : CustomerService;
  public _customer : Customer;
  public _projects : Project[] = [];
  private id: number;
  public btnNw: boolean;
  public myForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes

  //subscriptions
  private projSubscription: Subscription;
  private projSaveSubscription: Subscription;
  private initParamsSubscription: Subscription;
  private servCustSubscription: Subscription;

  constructor(
    private route: ActivatedRoute, 
    private servicesCustomer: ServicesCustomerService, 
    private projectsService: ProjectsService, 
    private _fb: FormBuilder,
    private customersRoutingService: CustomersRoutingService) { 
    this.btnNw = false;  
  }

  ngOnInit() {
    this.initParams();
    this.getServiceCustomer();
    this.initForm(0);
  }

  ngOnDestroy(){
    if (this.projSubscription) this.projSubscription.unsubscribe();
    if (this.projSaveSubscription) this.projSaveSubscription.unsubscribe();
    if (this.initParamsSubscription) this.initParamsSubscription.unsubscribe();
    if (this.servCustSubscription) this.servCustSubscription.unsubscribe();
  }

  save(model: Project, isValid: boolean, modal: any):void {
    this.submitted = true; // set form submit to true
    if(isValid)
    {
       this.projSaveSubscription = this.projectsService.saveProject(model).subscribe(data => {
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
    this.initParamsSubscription = this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
      }
    });
  }

  private getServiceCustomer():void {
    if(this.id > 0){
      this.servCustSubscription = this.servicesCustomer.get(this.id.toString()).subscribe(data => { 
          this._serviceCustomer = data;
          this.btnNw = true;
          this.initForm(this._serviceCustomer.IdCustomer);
          this._customer = this._serviceCustomer["Customer"];
          this.loadProjects();
      });
    }
  }



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
    this.projSubscription = this.projectsService.getAll(this._serviceCustomer.IdCustomer.toString()).subscribe(data => { 
      this._projects = data;
    });
  }

}
*/