import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getIsBootstraped, RootState } from '../reducers';

@Injectable({
  providedIn: 'root'
})
export class BootstrapAuthGuard implements CanActivate {
  isBootstrap: boolean;

  constructor(private store: Store<RootState>,
              private router: Router,
  ) {
    this.store.select(getIsBootstraped).subscribe((bootstrap => this.isBootstrap = bootstrap));
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.isBootstrap) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}

