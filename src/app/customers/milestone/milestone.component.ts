//import { Configuration } from './../../services/configuration';
import { CustomersRoutingParamsService } from './../customers-routing-params.service';
import { CurrencySignService } from './../../services/currency-sign.service';
import { CurrencySign } from './../../models/currency-sign';
import { BillingMilestoneDetail } from './../../models/billing-milestone-detail';
import { PaymentMethodsService } from './../../services/payment-methods.service';
import { DocumentTypesService } from './../../services/document-types.service';
import { ProvincesService } from './../../services/provinces.service';
import { PaymentMethod } from './../../models/payment-method';
import { DocumentType } from './../../models/document-type';
import { Province } from './../../models/provinces';
import { CustomersRoutingService } from './../customers-routing.service';
import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, UrlSegment, Router } from '@angular/router';
import { BillingService } from '../../services/billing.service';
import { Customer } from '../../models/customer';
import { BillingMilestone } from '../../models/billing-milestone';
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import { RequestOptions, Http } from "@angular/http";
import { UserConfigService } from "app/services/user-config.service";
declare var $: any;

@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.scss'],
  providers: [ BillingService, CustomersRoutingParamsService ]
})
export class MilestoneComponent implements OnInit, OnDestroy {
  public _milestone: BillingMilestone;
  public _milestoneDetails: BillingMilestoneDetail[];
  public _customer: Customer;
  private id : number;
  private idProject: number;
  private idService: number;
  private idCustomer: number;
  private idHito: number;
  @ViewChild('uploadFilesComponent') uploadFilesComponent;

  //combos
  private paymentMethods$: Observable<PaymentMethod>;
  private documentTypes$: Observable<DocumentType>;

  private currencySigns: CurrencySign[];
  private provinces: Province[];

  //subscriptions
  private paramsSubscription: Subscription;
  private getHitoSubscription: Subscription;
  private currencySignsSubscription: Subscription;
  private provincesSubscription: Subscription;
  private milestonesSaveSubscrip: Subscription;
  
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private milestonesService: BillingService, 
    private _fb: FormBuilder,
    private customersRoutingService: CustomersRoutingService,
    private provinceService: ProvincesService,
    private documentTypeService: DocumentTypesService,
    private paymentMethodServise: PaymentMethodsService,
    private currencySignService: CurrencySignService,
    private http: Http,
    //private config: Configuration,
    private custRoutingParams: CustomersRoutingParamsService,
    private userConfigService: UserConfigService
  ) { }

  ngOnInit() {
    this.initParams();
    this.getMilestone();
    this.getCombos();

    
  }

  ngOnDestroy(){
    if (this.paramsSubscription) this.paramsSubscription.unsubscribe();
    if (this.getHitoSubscription) this.getHitoSubscription.unsubscribe();
    if (this.currencySignsSubscription) this.currencySignsSubscription.unsubscribe();
    if (this.provincesSubscription) this.provincesSubscription.unsubscribe();
    if (this.milestonesSaveSubscrip) this.milestonesSaveSubscrip.unsubscribe();
  }

  private initParams():void {
    
    console.log(this.router.url); 
    //   /customers/detail/1/service/1/project/1/hito/1

    /*var urlParts = this.router.url.split("/");
    this.idCustomer = parseInt(urlParts[3]);
    this.idService = parseInt(urlParts[5]);
    this.idProject = parseInt(urlParts[7]);
    this.idHito = parseInt(urlParts[9]);

    this.paramsSubscription = this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
      }
    });*/

    this.idCustomer = this.custRoutingParams.idCustomer;
    this.idService = this.custRoutingParams.idService;
    this.idProject = this.custRoutingParams.idProject;
    this.idHito = this.custRoutingParams.idHito;
    this.id = this.idHito;

    

  }

  private getFiles(){
    this.uploadFilesComponent.loadFilesFromBackend();
  }

  private getMilestone():void {
    if(this.id > 0){
      this.getHitoSubscription = this.milestonesService.getHito(this.id.toString()).subscribe(data => { 
            this._milestone = data;
            console.log(data);
            this._customer = this._milestone["Customer"];
            
            //agrego un detalle vacío
            var detail = <BillingMilestoneDetail>{}
            detail.IdCurrencySign = 1;
            detail.IdBillingMilestone = this.id;
            this._milestone["BillingMilestoneDetails"].push(detail);

            this._milestoneDetails = this._milestone["BillingMilestoneDetails"];

            this.canGenerate();

            setTimeout(()=>this.getFiles());
            
      });
    }
  }

  private getCombos(){
    if (this.id > 0){
      this.paymentMethods$ = this.paymentMethodServise.getAll();
      this.documentTypes$ = this.documentTypeService.getAll();

      //this.provinces$ = this.provinceService.getAll();
      //this.currencySign$ = this.currencySignService.getAll();

      this.currencySignsSubscription = this.currencySignService.getAll().subscribe(
        data => {
          this.currencySigns = data
        }
      );

      this.provincesSubscription = this.provinceService.getAll().subscribe(
        data => {
          this.provinces = data
        }
      );
    }
  }

  subtotal(i: number){
    setTimeout(()=>{
      var quantity = $("#Detail" + i + "_Quantity")[0].value;
      var price = $("#Detail" + i + "_UnitPrice")[0].value;
      var subtotal = quantity * price;
      //$('#subtotal' + i).value(subtotal);
      this._milestoneDetails[i].SubTotal = subtotal;
      this.total();
    }, 0);
  }

  total(){
    setTimeout(()=>{

      var total: number = 0;
      var subtotal: number;
      for(let i = 0; i<this._milestoneDetails.length; i++){
        subtotal = $("#Detail" + i + "_Total")[0].value;
        total = total + Number(subtotal);
      }
      this._milestone.ImporteBruto = total;

    }, 0)
    
  }

  generar(){

    $("#generar").prop('disabled', true);

    if (this._milestoneDetails.length > 0){
      this._milestone.BillingMilestoneDetails = this._milestoneDetails.slice(0, this._milestoneDetails.length - 1);
      this.uploadFilesComponent.uploadFiles();
    }

    this.milestonesSaveSubscrip = this.milestonesService.aproveRejectHito(this._milestone, this.userConfigService.user().Id, false).subscribe(data => {
        if(data.ok){
          this.getMilestone();
          //actualizar datos del controller anterior
          this.customersRoutingService.reloadHistory.next(this.customersRoutingService.reloadHistory.value + 1);
          console.log("ok");
          console.log(data);
        }else{
          console.log("error");
          console.log(data);
        }
    });

    $("#generar").prop('disabled', false);
  }

  rechazar(){


    $("#rechazar").prop('disabled', true);

    if (this._milestoneDetails.length > 0){
      this._milestone.BillingMilestoneDetails = this._milestoneDetails.slice(0, this._milestoneDetails.length - 1);
      this.uploadFilesComponent.uploadFiles();
    }

    this.milestonesSaveSubscrip = this.milestonesService.aproveRejectHito(this._milestone, this.userConfigService.user().Id, true).subscribe(data => {
        if(data.ok){
          this.getMilestone();
          //actualizar datos del controller anterior
          this.customersRoutingService.reloadHistory.next(this.customersRoutingService.reloadHistory.value - 1);
          console.log("ok");
          console.log(data);
        }else{
          console.log("error");
          console.log(data);
        }
    });

    $("#rechazar").prop('disabled', false);
  }

  addDetail(i: number, force: boolean){

    //si estoy modificando el ultomo registro
    if (force || this._milestoneDetails.length - 1 == i){
      //y el usuario completó todos los campos oblicatiorios
      if (force || Boolean(this._milestoneDetails[i].Detail) && Boolean(this._milestoneDetails[i].Quantity) && Boolean(this._milestoneDetails[i].UnitPrice)){
        var detail = <BillingMilestoneDetail>{}
        detail.IdCurrencySign = 1;
        detail.IdBillingMilestone = this.id;
        this._milestoneDetails.push(detail);
      }
      
    }
   
  }

  canGenerate(){
    this.userConfigService.Hito_CanGenerate(this._milestone.CurrState);
  }

  generarEnabled(){
    
    //que el servicio diga que se puede generar
    var rpta: boolean = this.userConfigService.bCanGenerate;

    //que haya algun detalle cargado
    if (rpta){
      rpta = this._milestoneDetails.length > 1;
    }

    //que el importe bruto sea > 0
    if (rpta){
      rpta = this._milestone.ImporteBruto > 0;
    }

    return rpta;
    
  }

  rechazarEnabled(){
    //que el servicio diga que se puede generar
    var rpta: boolean = this.userConfigService.bCanRefuse;

    //que haya algun detalle cargado
    if (rpta){
      rpta = this._milestoneDetails.length > 1;
    }

    //que el importe bruto sea > 0
    if (rpta){
      rpta = this._milestone.ImporteBruto > 0;
    }

    return rpta;
  }

}
