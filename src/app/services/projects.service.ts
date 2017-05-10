import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Service } from './service';

import { Project } from '../models/project';

@Injectable()
export class ProjectsService {
  private baseUrl: string;
  private headers: Headers;

  constructor(private http: Http, private service: Service) {
    this.baseUrl = this.service.UrlApi;
    this.headers = this.service.getHeaders();
  }

  getAll(idCustomer: number, idService: number) {
    
    var params: URLSearchParams = new URLSearchParams();
    params.set('idCustomer', idCustomer.toString());
    params.set('idService', idService.toString());

    var options = new RequestOptions({ headers: this.headers});
    options.search = params;

    return this.http.get(`${this.baseUrl}/Project`, options).map((res:Response) => res.json());
  }

  get(id: string) {
    return this.http.get(`${this.baseUrl}/Project/${id}`, { headers: this.headers}).map((res:Response) => res.json());
  }

  saveProject(model : Project) {
    return this.http.post(`${this.baseUrl}/Project`, model, { headers: this.headers}).map((res:Response) => res );
  }

}
