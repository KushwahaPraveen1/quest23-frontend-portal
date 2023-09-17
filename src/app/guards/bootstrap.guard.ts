import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class BootstrapGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!localStorage.getItem(Constants.AUTH_TOKEN)) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;

  }
}
