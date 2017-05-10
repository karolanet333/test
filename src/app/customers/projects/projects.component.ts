import { CustomersRoutingParamsService } from './../customers-routing-params.service';
import { CustomersRoutingService } from './../customers-routing.service';
import { ServicesCustomerService } from './../../services/services-customer.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Project } from '../../models/project';
import { Customer } from '../../models/customer';
import { BillingMilestone } from '../../models/billing-milestone';
import { ProjectsService } from '../../services/projects.service';
import { BillingService } from '../../services/billing.service';
declare var $:any;

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  providers: [ProjectsService, BillingService, CustomersRoutingParamsService]
})
export class ProjectsComponent implements OnInit, OnDestroy {
  public _projects : Project[] = [];
  public _project : Project;
  public _milestones: BillingMilestone[] = [];
  private id : number;
  public myForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes

  private idCustomer: number;
  private idService: number;

  //subscriptions
  private paramsSubscrip: Subscription;
  private projectSubscrip: Subscription;
  private projectsSubscription: Subscription;
  private milestonesSubscrip: Subscription;
  private milestonesSaveSubscrip: Subscription;
  private servCustSubscription: Subscription;

  constructor(
    private projectsService: ProjectsService,
    private _fb: FormBuilder,
    private customersRoutingService: CustomersRoutingService,
    private custRoutingParams: CustomersRoutingParamsService
    ) {

  }

  ngOnInit() {
    this.initParams();
    //this.loadProjects();
  }

  ngOnDestroy(){
    if (this.paramsSubscrip) this.paramsSubscrip.unsubscribe();
    if (this.projectSubscrip) this.projectSubscrip.unsubscribe();
    if (this.milestonesSubscrip) this.milestonesSubscrip.unsubscribe();
    if (this.milestonesSaveSubscrip) this.milestonesSaveSubscrip.unsubscribe();
    if (this.projectsSubscription) this.projectsSubscription.unsubscribe();
    if (this.servCustSubscription) this.servCustSubscription.unsubscribe();
  }

  save(model: Project, isValid: boolean, modal: any):void {
    this.submitted = true; // set form submit to true
    model.IdService = this.idService;
    if(isValid)
    {
      this.projectsService.saveProject(model).subscribe(data => {
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

    this.idCustomer = this.custRoutingParams.idCustomer;
    this.idService = this.custRoutingParams.idService;
    this.id = this.idService;
    this.loadProjects();
    this.initForm(this.idCustomer);

    //this.getProject();

    /*var urlParts = this.router.url.split("/");
    this.idCustomer = parseInt(urlParts[3]);
    this.idService = parseInt(urlParts[5]);


    this.paramsSubscrip = this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.getProject();
      }
    });*/
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

  /*private getProject():void {
    if(this.id > 0){
      if (this.customersRoutingService.showProjects){
            this.projectSubscrip = this.projectsService.get(this.id.toString()).subscribe(data => {
                this._project = data;
                this.initForm(this.idCustomer);
                //this._customer = this._project["Customer"];
                //this.loadMilestones();
                this.loadProjects();
            });
      }

    }
  }*/

  private showModal(){
    $('#myModal').show();
  }

  private loadProjects():void {
    this.projectsSubscription = this.projectsService.getAll(this.idCustomer, this.idService).subscribe(data => {
      this._projects = data;
    });
  }

}
