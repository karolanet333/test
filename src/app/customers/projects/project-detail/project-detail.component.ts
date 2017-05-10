import { SolFacActionHist } from './../../../models/SolFacActionHist';
import { BillingMilestone } from './../../../models/billing-milestone';
import { SolFacHist } from './../../../models/SolFacHist';
import { CustomersRoutingParamsService } from './../../customers-routing-params.service';
import { Subscription } from 'rxjs/Subscription';
import { CustomersRoutingService } from './../../customers-routing.service';
import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef, Renderer } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../models/customer-service';
import { Project } from '../../../models/project';
import { Customer } from '../../../models/customer';
import { ProjectsService } from '../../../services/projects.service';
import { BillingService } from '../../../services/billing.service';
import { UserConfigService } from "app/services/user-config.service";
declare var $:any;
declare var require: any;

@Component({
  selector: 'project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  providers: [ProjectsService, BillingService, CustomersRoutingParamsService]
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  public _project : Project;
  //public _customer : Customer;
  public _milestones: BillingMilestone[] = [];
  public _milestone: BillingMilestone;
  //public _milestoneHists: SolFacHist[] = [];
  public _milestoneHists_filtered: SolFacHist[] = [];
  private _milestonesActionHists: SolFacActionHist[] = [];
  private id : number;
  private idCustomer: number;
  private idService: number;
  private idProject: number;
  public myForm: FormGroup; // our model driven form
  public editForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes

  private bDividir: boolean = false;
  private dividirCant: number = 0;
  private hitosDivididos = new Array<BillingMilestone>();
  private canShowFormHitosDivididos: boolean = false;

  //imagenes
  private imgVerSolFac = require('./../../../../assets/img/invoice6.png');
  private imgEdit = require('./../../../../assets/img/edit5.png');
  private imgHistory6 = require('./../../../../assets/img/history8.png');
  private imgOk = require('./../../../../assets/img/ok3.png');
  private imgCancel = require('./../../../../assets/img/cancel3.png');

  //permissions
  private canGenerateNew: boolean;

  //subscriptions
  private paramsSubscrip: Subscription;
  private projectSubscrip: Subscription;
  private milestonesSubscrip: Subscription;
  private milestonesSaveSubscrip: Subscription;
  private milestoneHistsSubscrip: Subscription;
  private reloadHistorySubscrip: Subscription;
  private milestoneDivideSaveSubscript: Subscription;

  @ViewChild('editHito') editHitoElement: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private milestonesService: BillingService,
    private _fb: FormBuilder,
    private customersRoutingService: CustomersRoutingService,
    private custRoutingParams: CustomersRoutingParamsService,
    private userConfigService: UserConfigService,
    private rd: Renderer
  ) {

  }

  ngOnInit() {
    this.initParams();
    //this.initForm(this.idCustomer);
    this.getProject();

    this.reloadHistorySubscrip = this.customersRoutingService.reloadHistory.subscribe(
        (value) => {
          //this.getMilestoneHist();
          this.loadMilestones();
        }
      );
  }

  ngOnDestroy(){
    if (this.paramsSubscrip) this.paramsSubscrip.unsubscribe();
    if (this.projectSubscrip) this.projectSubscrip.unsubscribe();
    if (this.milestonesSubscrip) this.milestonesSubscrip.unsubscribe();
    if (this.milestonesSaveSubscrip) this.milestonesSaveSubscrip.unsubscribe();
    if (this.milestoneHistsSubscrip) this.milestoneHistsSubscrip.unsubscribe();
    if (this.reloadHistorySubscrip) this.reloadHistorySubscrip.unsubscribe();
    if (this.milestoneDivideSaveSubscript) this.milestoneDivideSaveSubscript.unsubscribe();
  }

  save(model: BillingMilestone, isValid: boolean, modal: any):void {
        $('#saveNewHito').prop('disabled', true);
        model.IdService = this.idService;
        model.MontoInic = model.Monto;
        this.submitted = true; // set form submit to true
        if(isValid)
        {
            this.milestonesSaveSubscrip = this.milestonesService.saveHito(model, this.userConfigService.user().Id, true, false, false, false, this.hitosDivididos).subscribe(data => {
              if(data.ok){
                modal.hide();
                this.loadMilestones();
                //this.getMilestoneHist();
              }else{
                console.log(data);
              }
              $('#saveNewHito').prop('disabled', false);
            })
        }
    }

  edit(model: BillingMilestone, isValid: boolean, modal: any):void {
        $('#editHitoSave').prop('disabled', true);
        this._milestone.Name = model.Name;
        this._milestone.Monto = model.Monto;
        this.submitted = true; // set form submit to true
        if(isValid)
        {
            this.milestonesSaveSubscrip = this.milestonesService.editHito(this._milestone, this.userConfigService.user().Id).subscribe(data => {
              if(data.ok){
                this.hideEditHitoModal();
                this.loadMilestones();
                //this.getMilestoneHist();
              }else{
                console.log(data);
              }
              $('#editHitoSave').prop('disabled', false);
            })
        }
  }


  add(model: BillingMilestone, isValid: boolean, modal: any):void {
        $('#saveNewHito').prop('disabled', true);
        this._milestone.Name = model.Name;
        this._milestone.Monto = model.Monto;
        this.submitted = true; // set form submit to true
        if(isValid)
        {
            this.milestonesSaveSubscrip = this.milestonesService.addHito(this._milestone, this.userConfigService.user().Id).subscribe(data => {
              if(data.ok){
                this.hideEditHitoModal();
                this.loadMilestones();
                //this.getMilestoneHist();
              }else{
                console.log(data);
              }
              $('#saveNewHito').prop('disabled', false);
            })
        }
  }

  private initParams():void {

    //iniciar los parametros como en los demás forms ...
    this.idCustomer = this.custRoutingParams.idCustomer;
    this.idService = this.custRoutingParams.idService;
    this.idProject = this.custRoutingParams.idProject;
    this.id = this.idProject;


    /*this.paramsSubscrip = this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        //this.getProject();
      }
    });*/
  }

  private initForm(ic : number, Id: number = 0, Monto: number = 0, Name: string = ''):void {
    this.myForm = null;
    this.myForm = this._fb.group({
      Id: [0, [<any>Validators.nullValidator]],
      Name: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
      IdCustomer: [ic, [<any>Validators.required]],
      IdProject: [this.id, [<any>Validators.required]],
      Status: ['Activo', [<any>Validators.nullValidator, <any>Validators.minLength(5)]],
      Monto: [0, [<any>Validators.required, <any>Validators.minLength(1)]],
      ScheduledDate: [new Date(), [<any>Validators.required]],
      IdDocumentType: 1,
      IdPaymentMethod: 1
    });
  }

  private initEditForm():void {
    this.editForm = null;

    this.editForm = this._fb.group({
      Id: [this._milestone.Id, [<any>Validators.nullValidator]],
      Name: [this._milestone.Name, [<any>Validators.required, <any>Validators.minLength(5)]],
      IdCustomer: [this.idCustomer, [<any>Validators.required]],
      IdProject: [this.id, [<any>Validators.required]],
      Status: ['Activo', [<any>Validators.nullValidator, <any>Validators.minLength(5)]],
      Monto: [this._milestone.Monto, [<any>Validators.required, <any>Validators.minLength(1)]],
      ScheduledDate: [this._milestone.ScheduledDate, [<any>Validators.required]],
      IdDocumentType: 1,
      IdPaymentMethod: 1
    });
  }

  private getProject():void {
    if(this.id > 0){
      this.projectSubscrip = this.projectsService.get(this.id.toString()).subscribe(data => {
            this._project = data;
            this.initForm(this.idCustomer);
            //this._customer = this._project["Customer"];
            this.loadMilestones();
      });
    }
  }

  private loadMilestones():void{
    this.milestonesSubscrip = this.milestonesService.getAllHitosOverView(this.idCustomer, this.idService, this.idProject).subscribe(data => {
      this._milestones = data;

      //historico de acciones
      this._milestonesActionHists = [];
      for(let i=0; i<data.length; i++){
        this._milestonesActionHists = this._milestonesActionHists.concat(this._milestones[i].SolFacActionHists);
      }
    });
  }

  private getMilestone(index: number){
    this._milestone = this._milestones[index];
  }

  /*private getMilestoneHist(){
    this._milestoneHists = null;
    this.milestoneHistsSubscrip = this.milestonesService.getHitoHist().subscribe(data => {
      this._milestoneHists = data;
    });
  }*/

  private filter_milestoneHist(idHito: number){
    this._milestoneHists_filtered = this._milestones.filter(x => x.Id == idHito)[0].SolFacHists;
  }

  private editMilestone(index: number){
    this._milestone = this._milestones[index];
    this.initEditForm();
  }

  private showModal(){
    $('#myModal').show();
  }

  private getOkCancelImage(canceled:boolean){
    if (canceled){
      return this.imgCancel;
    } else {
      return this.imgOk;
    }

  }

  private ValidarCamposDivididos_Nombre(i: number){
    var rpta = true;
    var name = $('#dHito' + i + 'Name').val();
    if (name.length<5){
      rpta = false;
    }

    return rpta;
  }

  private ValidarCamposDivididos_Monto(i: number){
    var rpta = true;
    var monto = $('#dHito' + i + 'Monto').val();
    if (monto.length<1 || monto == "0"){
      rpta = false;
    }

    return rpta;
  }

  private DividirClick(){
    this.bDividir = !this.bDividir;
    this.hitosDivididos = new Array<BillingMilestone>();
    this.canShowFormHitosDivididos = false;
    setTimeout(()=>{
      $("#txtDividirCant").val("");
      $("#txtDividirCant").focus();
    });

  }

  private txtDividirChange(){
    var cant: number = parseInt($('#txtDividirCant').val());

    this.hitosDivididos = new Array<BillingMilestone>();

    if (cant > 0){

      for(let i = 0; i< cant; i++){
        this.hitosDivididos.push(Object.assign({}, this._milestone))
      }

      this.hitosDivididos.forEach((h, i) => {
        h.Monto = this._milestone.Monto / cant;
        h.Name = this._milestone.Name + " " + (i+1);
      });
    }

    this.canShowFormHitosDivididos = true;
  }

  private SaveHitosDivididos(modal: any){
        $('#saveHitosDivididos').prop('disabled', true);
        this.hitosDivididos.forEach(h => {
          h.IdService = this.idService;
        });

        if (this.userConfigService.user().Id > 0){
          this.milestoneDivideSaveSubscript = this.milestonesService.divideHito(this._milestone, this.userConfigService.user().Id, this.hitosDivididos)
          .subscribe(data => {
              if(data.ok){
                this.hideEditHitoModal();
                this.loadMilestones();
                //this.getMilestoneHist();
              }else{
                console.log(data);
              }

          });
        }

        $('#saveHitosDivididos').prop('disabled', false);
        this.setBDividirFalse();
  }

  private setBDividirFalse(){
    this.bDividir = false;
    this.hitosDivididos = new Array<BillingMilestone>();
    this.canShowFormHitosDivididos = false;
  }

  private hideEditHitoModal(){
    this.rd.invokeElementMethod(this.editHitoElement, 'hide');
    //this.editHitoElement.nativeElement.hide();
    //$('#editHito').hide();
    this.setBDividirFalse();
  }

}
