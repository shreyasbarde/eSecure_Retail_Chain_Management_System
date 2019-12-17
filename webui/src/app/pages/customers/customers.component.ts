import { Component, OnInit,TemplateRef, ViewChild,HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/api/customer.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {Customer} from '../../model/customer';

@Component({
	selector: 's-customers-pg',
	templateUrl: './customers.component.html',
    styleUrls: [ './customers.scss'],
})

export class CustomersComponent implements OnInit {



    columns:any[];
    rows:any[];
    pageSize:number=10;
    currentPage:number=0;
    isLastPageLoaded:boolean=false;
    isLoading:boolean=false;
    modalRef: BsModalRef;
    customer:Customer=new Customer()
    showmsg: boolean;
    message: any;
    @ViewChild('f') form: any;
    addressPattern="[a-zA-Z0-9 ][a-zA-Z0-9,.- ]* '"
    emailPattern=/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    deletemodalRef: BsModalRef;
    id: any;
    constructor(private router: Router, private customerService: CustomerService,private modalService: BsModalService) { }

    ngOnInit() {
        let me = this;
        me.getPageData();

        this.columns=[
            {prop:"id"       , name: "ID"          , width:50  },
            {prop:"firstName", name: "First Name"  , width:120 },
            {prop:"lastName" , name: "Last Name"   , width:120 },
            {prop:"company"  , name: "Company"     , width:120 },
            {prop:"email"    , name: "Email"       , width:200 },
            {prop:"phone"    , name: "Phone"       , width:160 },
            {prop:"address"  , name: "Address"     , width:220 },
        ];
    }

    getPageData(isAppend:boolean=false) {

        if (this.isLastPageLoaded===false){
            let me = this;
            me.isLoading=true;
            this.customerService.getCustomers(this.currentPage,this.pageSize).subscribe((data) => {
                me.isLastPageLoaded=data.last;
                me.currentPage = data.currentPageNumber+1;
                if (isAppend===true){
                    me.rows = me.rows.concat(data.items);
                }
                else{
                    me.rows = data.items;
                }
                me.isLoading=false;
            });
        }
    }

    onScroll() {
        console.log("bottom")
        if (this.isLoading===false){
            this.getPageData(true);
        }
	}
    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(
          template,
          Object.assign({}, { class: 'gray modal-lg' })
        );
      }
    openDeleteModal(template: TemplateRef<any>) {
        this.deletemodalRef = this.modalService.show(
          template,
          Object.assign({}, { class: 'gray modal-md' })
        );
      }
      save(){
        this.showmsg=false
          this.customerService.postCustomerDetails(this.customer).subscribe(
              response=>{
                  this.showmsg=true
                this.message=response.operationMessage;  
                this.getPageData(true);
                this.modalRef.hide();

                this.customer=new Customer()
                this.form.reset();
              
            }
          )
      }

      delete(){
          this.customerService.DeleteDetails(this.id).subscribe(
            response=>{
                this.showmsg=true
              this.message=response.operationMessage;  
              this.getPageData(true);  
              this.deletemodalRef.hide();           
              this.customer=new Customer()
              this.form.reset();
             
          }
          )
      }
}
