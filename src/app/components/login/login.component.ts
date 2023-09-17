import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppMiddleware } from '../../middlewares/app';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading: boolean;

  constructor(private router: Router, private appMiddleware: AppMiddleware, private http: HttpClient) {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      master_password: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit() {
    this.appMiddleware.getIsLoading().subscribe(loading => this.loading = loading);
  }

  submit() {
    this.appMiddleware.login(this.form.value);
  }
}
