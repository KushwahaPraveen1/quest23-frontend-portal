import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Constants } from '../../utils/constants';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      uname: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  submit() {
    // @ts-ignore
    if (this.formGroup.controls.uname.value === environment.adminUname &&
      this.formGroup.controls.password.value === environment.adminPassword) {
      localStorage.setItem(Constants.VERIFIED, 'true');
      this.router.navigate(['home']);
    }

  }

}
