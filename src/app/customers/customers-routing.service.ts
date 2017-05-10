import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class CustomersRoutingService {

  public showCustomers: boolean = true;
  public showCustomerDetail: boolean = true;
  public showServices: boolean = true;
  public showServiceDetail: boolean = true;
  public showProjects: boolean = true;
  public showProjectDetail: boolean = true;
  public showMilestoneDetail: boolean = true;

  //eventos entre controllers
  public reloadHistory = new BehaviorSubject(null);
  
  url: string;
  simplifiedUrl: string;

  constructor(private router: Router) { 

    router.events.subscribe((val) => {
      this.url = val.url;

      if (this.url.includes("customers")){
        this.showCustomers = true;
        this.showServices = false;
        this.showServiceDetail = false;
        this.showProjects = false;
        this.showProjectDetail = false;
        this.showMilestoneDetail = false;
        //this.showCustomerDetail = false;

        if (this.url.includes("customers/detail")){
          this.showCustomerDetail = true;
          
          
          if (this.url.includes("service")){

            //services
            this.showServiceDetail = true;
            this.showProjects = true;

            //project
            if (this.url.includes("project")){
              this.showProjects = false;
              this.showProjectDetail = true;
              this.showServiceDetail = false;

              //hitos
              if (this.url.includes("hito")){
                this.showProjectDetail = false;
                this.showMilestoneDetail = true;
              }
            }
          }
          //customers/detail
          else {
            this.showServices = true;
          }
          
        }
      }
    });
  }

}
