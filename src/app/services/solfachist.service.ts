import { SolFacHist } from './../models/SolFacHist';
import { User } from './../models/user';
import { Component, Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { Service } from './service';
import 'rxjs/add/operator/map';


@Injectable()
export class SolFacHistService {

  private baseUrl: string;
  private headers: Headers;

  constructor(private http: Http, private service: Service) {
    this.baseUrl = this.service.UrlApi;
    this.headers = this.service.getHeaders();
  }

  getAll(idHito: number) {
    return this.http.get(`${this.baseUrl}/SolFacHist/${idHito}`, { headers: this.headers}).map((res:Response) => res.json());
  }

  save(model : SolFacHist) {
    return this.http.post(`${this.baseUrl}/SolFacHist`, model, { headers: this.headers}).map((res:Response) => res );
  }

}
