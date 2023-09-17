import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { getIsTestSubmitted, RootState } from '../reducers';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThankyouGuard implements CanActivate {
  isTestSubmitted: boolean;

  constructor(private store: Store<RootState>) {
    this.store.select(getIsTestSubmitted).subscribe(res => {
      console.log(this.isTestSubmitted);
      this.isTestSubmitted = res;
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return !this.isTestSubmitted;
  }
}
