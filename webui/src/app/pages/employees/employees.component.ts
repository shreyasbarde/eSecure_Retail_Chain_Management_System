import { Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/api/employee.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Employee } from 'app/model/employee';

@Component({
	selector   : 's-employees-pg',
	templateUrl: './employees.component.html',
    styleUrls  : [ './employees.scss'],
})

export class EmployeesComponent implements OnInit {

    columns:any[];
    rows:any[];
    modalRef: BsModalRef;
    @ViewChild('f') form: any;
    employees: Employee= new Employee();
    showmsg: boolean;
    message: any;
    addressPattern="[a-zA-Z0-9 ][a-zA-Z0-9,.- ]* '";
    emailPattern=/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    id: any;
    deletemodalRef: BsModalRef;
    constructor(private router: Router, private employeeService: EmployeeService,private modalService: BsModalService) { }

    ngOnInit() {
        var me = this;
        me.getPageData();

        this.columns=[
            {prop:"id"        , name: "ID"          , width:50  },
            {prop:"firstName" , name: "First Name"  , width:120 },
            {prop:"lastName"  , name: "Last Name"   , width:120 },
            {prop:"email"     , name: "Email"       , width:250 },
            {prop:"phone"     , name: "Phone"       , width:160 },
            {prop:"department", name: "Department"  , width:220 }
        ];
    }

    getPageData() {
        var me = this;
        this.employeeService.getEmployees().subscribe((data) => {
            this.rows = data.items;
        });
    }
    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(
          template,
          Object.assign({}, { class: 'gray modal-lg' })
        );
      }
      save(){
        this.showmsg=false
          this.employeeService.postEmployeeDetails(this.employees).subscribe(
              response=>{
                  this.showmsg=true
                this.message=response.operationMessage;  
                this.getPageData();
                this.modalRef.hide();
                this.employees= new Employee()
                this.form.reset();
              
                
            }
          )
      }
      openDeleteModal(template: TemplateRef<any>) {
        this.deletemodalRef = this.modalService.show(
          template,
          Object.assign({}, { class: 'gray modal-md' })
        );
      }
      delete(){
        this.employeeService.DeleteDetails(this.id).subscribe(
          response=>{
              this.showmsg=true
            this.message=response.operationMessage;  
            this.getPageData();
            this.deletemodalRef.hide();
            this.employees=new Employee()
            this.form.reset();
           

        }
        )
    }
 
  
}
