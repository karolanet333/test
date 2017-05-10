import { Component, Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { Service } from './service';
import 'rxjs/add/operator/map';

import { CurrencySign } from '../models/currency-sign';

@Injectable()
export class CurrencySignService {

  private baseUrl: string;
  private headers: Headers;
  private entityName: string = "CurrencySign";

  constructor(private http: Http, private service: Service) {
    this.baseUrl = this.service.UrlApi;
    this.headers = this.service.getHeaders();
  }

  getAll() {
    return this.http.get(`${this.baseUrl}/${this.entityName}`, { headers: this.headers}).map((res:Response) => res.json());
  }

  get(id: string) {
    return this.http.get(`${this.baseUrl}/${this.entityName}/${id}`, { headers: this.headers}).map((res:Response) => res.json());
  }

  save(model : CurrencySign) {
    return this.http.post(`${this.baseUrl}/${this.entityName}`, model, { headers: this.headers}).map((res:Response) => res );
  }

}
