//import { UserConfigService } from './../services/user-config.service';
import { UsersComponent } from './../users/users.component';
//import { CustomersRoutingParamsService } from './customers-routing-params.service';
//import { Configuration } from 'app/services/configuration';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { SharedModule } from './../shared/shared.module';
//import { UploadFileTestComponent } from './projects/upload-file-test/upload-file-test.component';
import { UploadFileService } from './../services/upload-file.service';
//import { ModalModule } from './../shared/modal/modal.module';

import { PaymentMethodsService } from './../services/payment-methods.service';
import { DocumentTypesService } from './../services/document-types.service';
import { ProvincesService } from './../services/provinces.service';
import { CurrencySignService } from './../services/currency-sign.service';
import { CustomersRoutingService } from './customers-routing.service';
import { ServicesComponent } from './services/services.component';

import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ng2-bootstrap/modal';
import { DatePickerModule } from 'ng2-datepicker';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { ServiceDetailComponent } from './services/service-detail/service-detail.component';
import { MilestoneComponent } from './milestone/milestone.component';
import { ProjectsComponent } from './projects/projects.component';


@NgModule({
  imports: [
    CustomersRoutingModule,
    //HttpModule,
    //CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    DatePickerModule,
    //ModalModule,
    SharedModule
  ],
  declarations: [ 
    CustomersComponent,
    CustomerDetailComponent,
    ServiceDetailComponent,
    MilestoneComponent,
    ServicesComponent,
    ProjectsComponent,
    ProjectDetailComponent//,
    //UsersComponent
    //UploadFileTestComponent//,
    //UploadFileComponent
  ],
  providers: [
    CustomersRoutingService,
    ProvincesService,
    DocumentTypesService,
    PaymentMethodsService,
    CurrencySignService//,
    //Configuration//,
    //CustomersRoutingParamsService,
    //UploadFileService
  ]
})
export class CustomersModule { }
