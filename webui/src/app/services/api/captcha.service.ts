import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { CaptchaDomain } from 'app/model/captcha-domain';
import { AppConfig } from 'app/app-config';

export class CaptchaService {
  // AppConfig: any;

  constructor(private httpClient: HttpClient, handler: HttpBackend,  private appConfig:AppConfig) {
    this.httpClient = new HttpClient(handler);
  }

  loadCaptcha(): Observable<CaptchaDomain> {
    debugger
    return this.httpClient.get<CaptchaDomain>(this.appConfig.baseApiPath + `captcha/loadcaptcha`);
  }

}
