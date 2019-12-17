import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { UserInfoService, LoginInfoInStorage} from '../../services/user-info.service';
import { Router } from '@angular/router';
import { ApiRequestService } from '../../services/api/api-request.service';
import { RegistrationService } from '../../services/api/registration.service';

@Component({
  selector: 's-registration-pg',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent implements OnInit {

  errMsg:string = '';
  passwordPattern="^(.{0,15}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$";
  emailpattern="/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/"; 
  public showmsg: boolean;
  @ViewChild('f') form:any;
  constructor(
    private router: Router,
    private regitrationService :RegistrationService,
    private apiRequest: ApiRequestService,

  ) { }

  model: any = {};
  loading = false;

  ngOnInit() {
    
  }

  reset(){
    this.loading = true;
  }
  register() {
    debugger
    this.loading = true;
    this.model.fullName=this.model.firstName+ "" +this.model.lastName;
    this.model.blocked="false";
    this.model.role="USER";
    this.model.active="true";
    this.showmsg=false;
    // this.regitrationService.RegisterUser('user',this.model)
    this.apiRequest.post('user', this.model)
      .subscribe(jsonResp => 
        {this.showmsg=true;
          this.model={} 
          if (jsonResp !== undefined && jsonResp !== null && jsonResp.operationStatus === "SUCCESS"){
              this.errMsg = 'User Added Successfully';
          }else{
              this.errMsg = 'failed to add User';
          }
          this.loading = false;
          this.router.navigate(['/home/signup']);
          this.form.reset()
      });
  }
}
