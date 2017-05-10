import { DocumentType } from '../models/document-type';
import { Component, Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { Service } from './service';
import 'rxjs/add/operator/map';


@Injectable()
export class DocumentTypesService {

  private baseUrl: string;
  private headers: Headers;

  constructor(private http: Http, private service: Service) {
    this.baseUrl = this.service.UrlApi;
    this.headers = this.service.getHeaders();
  }

  getAll() {
    return this.http.get(`${this.baseUrl}/DocumentType`, { headers: this.headers}).map((res:Response) => res.json());
  }

  get(id: string) {
    return this.http.get(`${this.baseUrl}/DocumentType/${id}`, { headers: this.headers}).map((res:Response) => res.json());
  }

  save(model : DocumentType) {
    return this.http.post(`${this.baseUrl}/DocumentType`, model, { headers: this.headers}).map((res:Response) => res );
  }

}
