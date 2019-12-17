import { Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ManagersService } from '../../services/api/managers.service';


@Component({
	selector   : 's-managers-pg',
	templateUrl: './managers.component.html',
    styleUrls  : [ './managers.scss'],
})

export class ManagersComponent implements OnInit {

    columns:any[];
    rows:any[];

    constructor(private router: Router, private managersService: ManagersService) { }

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
        this.managersService.getManagers().subscribe((data) => {
            this.rows = data.items;
        });
    }

}
