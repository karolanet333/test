import { SolFacState } from './../models/SolFacState';
import { User } from './../models/user';
import { Component, Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { Service } from './service';
import 'rxjs/add/operator/map';


@Injectable()
export class SolFacStateService {

  private baseUrl: string;
  private headers: Headers;

  constructor(private http: Http, private service: Service) {
    this.baseUrl = this.service.UrlApi;
    this.headers = this.service.getHeaders();
  }

  getAll() {
    return this.http.get(`${this.baseUrl}/SolFacState`, { headers: this.headers}).map((res:Response) => res.json());
  }

  save(model : SolFacState) {
    return this.http.post(`${this.baseUrl}/SolFacState`, model, { headers: this.headers}).map((res:Response) => res );
  }

}
