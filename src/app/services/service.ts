import { Configuration } from 'app/services/configuration';
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

@Injectable()
export class  Service {

    UrlApi : string;
    Authorization: string;

    constructor(
        private config: Configuration
    ){
        //this.UrlApi = "http://localhost:59605/api"; // localhost
        //this.UrlApi = "http://sofrelab-iis1.cloudapp.net:9696/api"; // dev

        //this.Authorization="29c05029-ddf4-4e5e-8a91-62c5af6ae294";

        this.UrlApi = config.UrlApi;
        this.Authorization = config.Authorization;
    }

    getHeaders(){
        /*let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', '29c05029-ddf4-4e5e-8a91-62c5af6ae294');
        
        return headers;*/

        return this.config.getHeaders();
    }
}