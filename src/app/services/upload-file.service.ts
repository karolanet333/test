import { RequestOptions } from '@angular/http';
import { Component, Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { Service } from './service';
import 'rxjs/add/operator/map';

@Injectable()
export class UploadFileService {

  private baseUrl: string;
  private headers: Headers;

  constructor(private http: Http, private service: Service) {
    this.baseUrl = this.service.UrlApi;
    this.headers = this.service.getHeaders();
  }

  /*uploadFile() {
    return this.http.get(`${this.baseUrl}/UploadFile`, { headers: this.headers}).map((res:Response) => res.json());
  }*/

/*
    uploadFile(file: File) {

        var url = `${this.baseUrl}/UploadFile`;
        var xhr = new XMLHttpRequest();
        var fd = new FormData();
        xhr.open("POST", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log("ok");
            }
        };

        fd.append("upload_file", file);
        xhr.send(fd);
        
    }
    */

  


  uploadFile(file: any, fileName: string) {  

      //let formData: FormData = new FormData();  
      //formData.append('uploadFile', file, file.name);  

      var fileData = {
        //File: JSON.stringify(file),
        File: file,
        FileName: fileName
      };

      //let headers = new Headers();
        //headers.append('Content-Type', 'application/json');
        //headers.append('Authorization', '29c05029-ddf4-4e5e-8a91-62c5af6ae294');
      let headers = this.headers;
      //headers.append('Content-Type', 'json');  
      //headers.append('Accept', 'application/json');  
      let options = new RequestOptions({ headers: headers });  
      let apiUrl1 = `${this.baseUrl}/UploadFile`;  
      this.http.post(apiUrl1, fileData, options)  
        .map(res => res.json())  
        .catch(error => Observable.throw(error))  
        .subscribe(  
          data => console.log('success'),  
          error => console.log(error)  
        )  

  }  

}
