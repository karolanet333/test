import { PaymentMethod } from './../models/payment-method';
import { Component, Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { Service } from './service';
import 'rxjs/add/operator/map';


@Injectable()
export class PaymentMethodsService {

  private baseUrl: string;
  private headers: Headers;

  constructor(private http: Http, private service: Service) {
    this.baseUrl = this.service.UrlApi;
    this.headers = this.service.getHeaders();
  }

  getAll() {
    return this.http.get(`${this.baseUrl}/PaymentMethod`, { headers: this.headers}).map((res:Response) => res.json());
  }

  get(id: string) {
    return this.http.get(`${this.baseUrl}/PaymentMethod/${id}`, { headers: this.headers}).map((res:Response) => res.json());
  }

  save(model : PaymentMethod) {
    return this.http.post(`${this.baseUrl}/PaymentMethod`, model, { headers: this.headers}).map((res:Response) => res );
  }

}
