import { Ng2ModalComponent } from './modal/ng2modal.component';
import { HttpModule } from '@angular/http';
import { UploadFileComponent } from './upload-file/upload-file.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { Configuration } from "app/services/configuration";

@NgModule({
  imports: [
    CommonModule//,
    //HttpModule
  ],
  declarations: [ 
    UploadFileComponent,
    Ng2ModalComponent
  ],
  providers: [
    //Configuration
  ],
  exports: [
    CommonModule,
    UploadFileComponent,
    Ng2ModalComponent
  ]
})
export class SharedModule { }
