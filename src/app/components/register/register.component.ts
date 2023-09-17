import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationUtils } from '../../utils/validations';
import { AppMiddleware } from '../../middlewares/app';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  branches = ['CSE', 'CS', 'CSE(AI/ML)', 'AIML','CSE(DS)', 'CS/IT', 'IT'];
  loading = false;
  name: FormControl;

  constructor(private router: Router, private appMiddleware: AppMiddleware) {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      studentNumber: new FormControl(null, [Validators.required]),
      rollNumber: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null, [Validators.required, ValidationUtils.validatePhoneNo.bind(this)]),
      skills: new FormControl(null, [Validators.required]),
      hackerrankHandle: new FormControl(null, [Validators.required]),
      branch: new FormControl(null, [Validators.required]),
      // recaptcha: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() {
    this.appMiddleware.getIsLoading().subscribe(loading => this.loading = loading);
  }

  submit() {
    console.log(this.form.value);
    this.appMiddleware.register(this.form.value);
  }

  handleReset() {
    console.log('Reset');
  }

  handleExpire() {
    console.log('Expire');
  }

  handleLoad() {
    console.log('Load');
  }

  handleSuccess(event) {
    console.log('Success', event);
  }


}
