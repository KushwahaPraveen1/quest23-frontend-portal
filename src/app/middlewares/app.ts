import { Store } from '@ngrx/store';
import { getIsLoading, getIsLoggedIn, RootState } from '../reducers';
import { combineLatest, Observable, throwError } from 'rxjs';
import { User, Member } from '../models/user';
import { catchError, filter, map, switchMap, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterFailed, RegisterSent, RegisterSuccess, LogInFailed, LogInSent, LogInSuccess } from '../actions/app';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../environments/environment';
import { Constants } from '../utils/constants';
import { HttpService } from '../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class AppMiddleware {

  private errorMessage = 'Something went wrong. Please try again.';

  constructor(private store: Store<RootState>,
              private httpService: HttpService,
              private router: Router,
              private snackbar: MatSnackBar) {
  }

  register(user: User) {
    const isLoggedIn$ = this.store.select(getIsLoggedIn);
    const isLoading$ = this.store.select(getIsLoading);
    const status$ = combineLatest(isLoading$, isLoggedIn$).pipe(
      take(1),
      map(([loading, loggedIn]) => loading || loggedIn),
      filter(status => !status),
      switchMap(() => {
        this.store.dispatch(new RegisterSent());
        return this.httpService.post(`/auth/register`, user);
      }),
      catchError(err => throwError(err)));
    status$.subscribe((res: { user: User, token: string }) => {
      if (res.user) {
        this.store.dispatch(new RegisterSuccess(res.user));
        localStorage.setItem(Constants.AUTH_TOKEN, res.token);
        localStorage.setItem(Constants.USER_ID, res.user._id);
        this.router.navigate(['login']);
      } else {
        this.store.dispatch(new RegisterFailed());
        this.snackbar.open(this.errorMessage, null, { duration: 5000 });
      }
    }, (e) => {
      console.log(e.error.errors[0].msg);
      const errorMsg = e.error.errors[0].msg.toUpperCase() || this.errorMessage;
      this.store.dispatch(new RegisterFailed());
      this.snackbar.open(errorMsg, null, { duration: 5000 });
    });
  }

  login(member: Member) {
    const isLoggedIn$ = this.store.select(getIsLoggedIn);
    const isLoading$ = this.store.select(getIsLoading);
    const status$ = combineLatest(isLoading$, isLoggedIn$).pipe(
      take(1),
      map(([loading, loggedIn]) => loading || loggedIn),
      filter(status => !status),
      switchMap(() => {
        this.store.dispatch(new LogInSent());
        return this.httpService.post(`/users/login`, member);
      }),
      catchError(err => throwError(err)));
    status$.subscribe((res: { user: User, token: string }) => {
      if (res.user) {
        this.store.dispatch(new LogInSuccess(res.user));
        localStorage.setItem(Constants.AUTH_TOKEN, res.token);
        localStorage.setItem(Constants.USER_ID, res.user._id);
        this.router.navigate(['']);
      } else {
        this.store.dispatch(new LogInFailed());
        this.snackbar.open(this.errorMessage, null, { duration: 5000 });
      }
    }, (e) => {
      console.log(e);
      this.store.dispatch(new LogInFailed());
      this.snackbar.open(e.error.error || this.errorMessage, null, { duration: 5000 });
    });
  }

  getIsLoading(): Observable<boolean> {
    return this.store.select(getIsLoading);
  }
}
