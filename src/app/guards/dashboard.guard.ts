import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {getIsAnswersInitialized, RootState} from '../reducers';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {
  isTestStarted: boolean;

  constructor(private store: Store<RootState>) {
    this.store.select(getIsAnswersInitialized).subscribe((res) => {
      this.isTestStarted = res;
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return state.url.endsWith('dashboard');
  }
}
