import { Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { ProductService } from '../../services/api/product.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal/';
import { Product } from 'app/model/product';


@Component({
	selector: 's-products-pg',
	templateUrl: './products.component.html',
    styleUrls: [ './products.scss'],
})

export class ProductsComponent implements OnInit {

    @ViewChild('productDiscontinuedTpl') productDiscontinuedTpl: TemplateRef<any>;
    @ViewChild('template') template: TemplateRef<any>;
    @ViewChild('f') form: any;

    //ngx-Datatable Variables
    columns:any[];
    rows:any[];

    modalRef: BsModalRef;
    product:Product=new Product()
    message: any;
    showmsg: boolean;
    deletemodalRef: BsModalRef;
    id: any;
    constructor( private router: Router, private productService: ProductService,private modalService: BsModalService) {}
    ngOnInit() {
        var me = this;
        me.getPolicyData();
        this.columns=[
            {prop:"id"  , name: "ID"         , width:60  },
            {prop:"productCode"  , name: "Code"         , width:60  },
            {prop:"productName"  , name: "Name"         , width:200 },
            {prop:"standardCost" , name: "Standard Cost", width:100 },
            {prop:"listPrice"    , name: "List Price"   , width:100 },
            {prop:"category"     , name: "Category"     , width:100 },
            {prop:"targetLevel"  , name: "Target Level" , width:100 },
            {prop:"reorderLevel" , name: "Reorder Level", width:100 },
            {prop:"minimumReorderQuantity", name: "Min Order", width:100 },
            {prop:"discontinued" , name: "Discontinued" , width:90, cellTemplate: this.productDiscontinuedTpl}
        ];

    }

    getPolicyData() {
        this.productService.getProducts().subscribe( (policyData) => {
            this.rows = policyData;
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
          this.productService.postProductDetails(this.product).subscribe(
              response=>{
                  this.showmsg=true
                this.message=response.operationMessage;  
                this.getPolicyData();
                this.modalRef.hide();
                this.product=new Product()
                this.form.reset();
               

            }
          )
      }
      delete(){
        this.productService.DeleteDetails(this.id).subscribe(
          response=>{
              this.showmsg=true
            this.message=response.operationMessage;  
            this.getPolicyData();
            this.deletemodalRef.hide();
            this.product=new Product()
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

}
