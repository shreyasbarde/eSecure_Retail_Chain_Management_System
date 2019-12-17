import { Injectable } from '@angular/core';
import { ApiRequestService } from '../api/api-request.service';
import { TranslateService } from '../api/translate.service';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LoginInfoInStorage } from '../user-info.service';

@Injectable()
export class RegistrationService {

  constructor(
    private apiRequest: ApiRequestService,
    private translate:TranslateService,
) {}

RegisterUser(url:string, body:Object): Observable<any> {
  debugger
  let me = this;

  let loginDataSubject:BehaviorSubject<any> = new BehaviorSubject<any>([]); // Will use this BehaviorSubject to emit data that we want after ajax login attempt

  this.apiRequest.post(url, body)
      .subscribe(jsonResp => 
        {
          if (jsonResp !== undefined && jsonResp !== null && jsonResp.operationStatus === "SUCCESS"){
              return null;
          }
      }
      );
      return null;
}
}
