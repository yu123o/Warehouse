import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardServiceService implements CanActivate {

  constructor() { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let AccountID = localStorage.getItem("id")
    let userType = localStorage.getItem("userType")
  
    if (AccountID != undefined && AccountID != null && AccountID != '' && Number(AccountID) > 0) {
      if (route.url?.toString().includes('Warehouse') && userType == "Manager")
        return true;
      else if(route.url?.toString().includes('ADDSupplyDocument') && userType == "Employee")
        return true;
      else if(!route.url?.toString().includes('Warehouse') && !route.url?.toString().includes('ADDSupplyDocument') )
        return true
    }

    return false;
  }
}
