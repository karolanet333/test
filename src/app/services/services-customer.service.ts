import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Service } from './service';

import { CustomerService } from '../models/customer-service';

@Injectable()
export class ServicesCustomerService {
  private baseUrl: string;
  private headers: Headers;

  constructor(private http: Http, private service: Service) {
    this.baseUrl = this.service.UrlApi;
    this.headers = this.service.getHeaders();
  }

  getAll(idCustomer: string) {
    return this.http.get(`${this.baseUrl}/CustomerServiceByIdCustomer/${idCustomer}`, { headers: this.headers}).map((res:Response) => res.json());
  }

  get(id: string) {
    return this.http.get(`${this.baseUrl}/CustomerService/${id}`, { headers: this.headers}).map((res:Response) => res.json());
  }

  save(model : CustomerService) {
    return this.http.post(`${this.baseUrl}/CustomerService`, model, { headers: this.headers}).map((res:Response) => res );
  }

}
