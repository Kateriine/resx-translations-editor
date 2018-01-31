import { Inject, Injectable } from '@angular/core';

import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import xml2js from 'xml2js';


@Injectable()
export class LoadXmlService {



   constructor(public http : Http)
   {

   }


   handleError(error: any) {
    // retrieve error message to show
    let err = 'argh';
    return Observable.throw(err);
  }

   loadXML(url:string, callbackSuccess?, callbackError?) {
       return this.http.get(url)
       .map(res => res.text())
       .catch((err) => this.handleError(err))

     }




   


}
