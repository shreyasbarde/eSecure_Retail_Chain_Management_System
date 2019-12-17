import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../../services/api/login.service';
import { Router } from '@angular/router';
import { CaptchaService } from '../../services/api/captcha.service';
import { CaptchaDomain } from 'app/model/captcha-domain';
import { CaptchaEqValidator } from 'app/captch/captchacustom-validators';

@Component({
	selector   : 's-login-pg',
	templateUrl: './login.component.html',
    styleUrls  : [ './login.scss'],
})

export class LoginComponent implements OnInit {
    model: any = {};
    errMsg:string = '';
  islogged: boolean;
  public erroMessageCaptcha: String;
  public isValidCaptchaInput: Boolean = true;
  public isValidCaptchaKey: Boolean = true;
  @ViewChild('f') form: any;
  
  public captchaDomain: CaptchaDomain;
    constructor(
        private router: Router,
        private loginService: LoginService,private captchaService: CaptchaService) { }
    ngOnInit() {
        // reset login status
        // this.captchaDomain = new CaptchaDomain("", "", "");
        this.loginService.logout(false);
        // this.loadCaptcha();
    }

    login() {
      this.islogged=false
      // if(this.validateCaptcha()){
        // this.loginService.getToken(this.model.username, this.model.password,this.model.captchaInput,this.captchaDomain.captchaKey)
        this.loginService.getToken(this.model.username, this.model.password)
  
            .subscribe(resp => {
              console.log(resp);
              if(resp['success']==true){
                this.islogged=false
                this.errMsg=''
                this.router.navigate([resp.landingPage]);
                // this.loadCaptcha();
              }else  if (resp.user === undefined || resp.user.token === undefined || resp.user.token === "INVALID" ){
                    this.islogged=true
                    // this.loadCaptcha();
                        this.errMsg = 'Username or password is incorrect';
                        return;// this.router.navigate(["login"]);;
                    }
                   
              },errResponse => {
                  switch(errResponse.status){
                    case 401:
                      this.errMsg = 'Username or password is incorrect';
                      break;
                    case 404:
                      this.errMsg = 'Service not found';
                    case 408:
                      this.errMsg = 'Request Timedout';
                    case 500:
                      this.errMsg = 'Internal Server Error';
                    default:
                      this.errMsg = 'Server Error';
                  }
                  // this.loadCaptcha();
                }
            );
    // }else {
    //   this.erroMessageCaptcha = "Please enter a valid captcha";
    // }
    // this.loadCaptcha();
    // this.form.get('captchaInput').reset();
  }

    onSignUp(){
      this.router.navigate(['signup']);
    }

    // loadCaptcha() {
    //   debugger
    //   this.captchaService.loadCaptcha().subscribe(data => {
    //     this.captchaDomain = data;
    //   });
    //   this.form.reset();
    // }
  
    // validateCaptcha() {
    //   const captchaInput = this.model.captchaInput;
    //   return CaptchaEqValidator.validateCaptcha(captchaInput, this.captchaDomain.captchaStr)
    // }

}
