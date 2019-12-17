import { Injectable } from '@angular/core';
import { UserInfoService } from './user-info.service';
import { LoginService } from './api/login.service';
import { Router, CanActivate, CanActivateChild,ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class RoleGuard implements CanActivate, CanActivateChild {

    constructor(
        private router: Router,
        private loginService: LoginService,
        private userInfoService: UserInfoService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        debugger
        let url: string = state.url;
        let expectedRole:string = route.routeConfig.data[0].expectedRole[0];
        return this.checkLogin(url,expectedRole);
        //return true;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot,): boolean {
        debugger
        return this.canActivate(route, state);
    }

    checkLogin(url: string,expectedRole:string): boolean {
        debugger
        if (this.userInfoService.isAuthorisedIn(expectedRole)) {
            return true;
        }
        console.log("User is not logged - This routing guard prvents redirection to any routes that needs logging.");
        //Store the original url in login service and then redirect to login page
        // this.loginService.landingPage = url;
        this.router.navigate(['login',]);
        return false;
    }

}
