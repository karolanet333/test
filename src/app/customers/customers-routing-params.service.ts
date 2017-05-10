import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomersRoutingParamsService {
    idCustomer: number = 0;
    idService: number = 0;
    idProject: number = 0;
    idHito: number = 0;

    constructor(private router: Router){
    //   /customers/detail/1/service/1/project/1/hito/1

        var urlParts = this.router.url.split("/");

        if (urlParts.length > 3){
            this.idCustomer = parseInt(urlParts[3]);
            if (urlParts.length > 5){
                this.idService = parseInt(urlParts[5]);
                if (urlParts.length > 7){
                    this.idProject = parseInt(urlParts[7]);
                    if (urlParts.length > 9){
                        this.idHito = parseInt(urlParts[9]);
                    }
                }
            }
        }
        
    }
}