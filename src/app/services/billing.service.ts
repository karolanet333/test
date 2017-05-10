import { BillingMilestoneDTO } from './../models/dto/billing-milestone-dto';
import { BillingMilestone } from './../models/billing-milestone';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Service } from './service';

@Injectable()
export class BillingService {
  private baseUrl: string;
  private headers: Headers;
  
  constructor(private http: Http, private service: Service) {
    this.baseUrl = this.service.UrlApi;
    this.headers = this.service.getHeaders();
  }

  getAllHitos(idCustomer: number, idService: number, idProject: number) {

    var params = new URLSearchParams();
    params.set('idCustomer', idCustomer.toString());
    params.set('idService', idService.toString());
    params.set('idProject', idProject.toString());

    var options = new RequestOptions({headers: this.headers});
    options.search = params;


    return this.http.get(`${this.baseUrl}/BillingMilestone`, options).map((res:Response) => res.json());
  }

  getAllHitosOverView(idCustomer: number, idService: number, idProject: number) {

    var params = new URLSearchParams();
    params.set('idCustomer', idCustomer.toString());
    params.set('idService', idService.toString());
    params.set('idProject', idProject.toString());

    var options = new RequestOptions({headers: this.headers});
    options.search = params;


    return this.http.get(`${this.baseUrl}/BillingMilestoneOverView`, options).map((res:Response) => res.json());
  }

  getHito(id: string) {
    return this.http.get(`${this.baseUrl}/BillingMilestone/${id}`, { headers: this.headers}).map((res:Response) => res.json());
  }

  getHitoHist(){
    return this.http.get(`${this.baseUrl}/SolFacHist`, { headers: this.headers}).map((res:Response) => res.json());
  }

  saveHito(model : BillingMilestone, idUser: number, simple: boolean, update: boolean, rechazar: boolean, dividir: boolean, hitosDivididos: BillingMilestone[]) {
    var data ={
      BillingMilestone: model,
      //str: "Hola",
      IdUser: idUser,
      Simple: simple,
      Update: update,
      Rechazar: rechazar,
      Dividir: dividir,
      HitosDivididos: hitosDivididos
    };
    return this.http.post(`${this.baseUrl}/BillingMilestone`, data, { headers: this.headers}).map((res:Response) => {
      return res
    } );
  }

  editHito(billingMilestone : BillingMilestone, idUser: number) {
    var data ={
      BillingMilestone: billingMilestone,
      IdUser: idUser
    };
    return this.http.put(`${this.baseUrl}/BillingMilestone`, data, { headers: this.headers}).map((res:Response) => {
      return res
    } );
  }

  addHito(billingMilestone : BillingMilestone, idUser: number) {
    var data ={
      BillingMilestone: billingMilestone,
      IdUser: idUser
    };
    return this.http.post(`${this.baseUrl}/BillingMilestone`, data, { headers: this.headers}).map((res:Response) => {
      return res
    } );
  }

  divideHito(billingMilestone : BillingMilestone, idUser: number, hitosDivididos: BillingMilestone[]) {
    var data ={
      BillingMilestone: billingMilestone,
      IdUser: idUser,
      HitosDivididos: hitosDivididos
    };
    return this.http.post(`${this.baseUrl}/BillingMilestoneDivide`, data, { headers: this.headers}).map((res:Response) => {
      return res
    } );
  }

  aproveRejectHito(billingMilestone : BillingMilestone, idUser: number, rechazar: boolean) {
    var data ={
      BillingMilestone: billingMilestone,
      IdUser: idUser,
      Rechazar: rechazar
    };
    return this.http.put(`${this.baseUrl}/BillingMilestoneDetails`, data, { headers: this.headers}).map((res:Response) => {
      return res
    } );
  }

  

}

