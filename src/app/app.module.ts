import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule, MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import { appRootReducer } from './reducers';
import { RegisterComponent } from './components/register/register.component';
import { InstructionComponent } from './components/instruction/instruction.component';
import { BootstrapComponent } from './components/bootstrap/bootstrap.component';
import { BootstrapGuard } from './guards/bootstrap.guard';
import { NgxLoadingModule } from 'ngx-loading';
import { AnonymousAuthGuard } from './guards/anonymous-auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PanelComponent } from './components/dashboard/panel/panel.component';
import { QuestionsComponent } from './components/dashboard/questions/questions.component';
import { BootstrapAuthGuard } from './guards/bootstrap-auth.guard';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { ThankyouGuard } from './guards/thank-you.guard';
import { ConfirmationPopupComponent } from './components/dashboard/panel/confirmation-popup/confirmation-popup.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuard } from './guards/admin.guard';
// import { NgxCaptchaModule } from 'ngx-captcha';
import {DashboardGuard} from './guards/dashboard.guard';


export const routes: Routes = [
  {
    path: '',
    component: BootstrapComponent,
    canActivate: [BootstrapGuard]
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'home',
    component: HomepageComponent,
    canActivate: [AnonymousAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AnonymousAuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AnonymousAuthGuard, AdminGuard]
  },
  {
    path: 'instructions',
    component: InstructionComponent,
    canActivate: [AdminGuard]
    // canActivate: [BootstrapAuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ThankyouGuard, DashboardGuard]
  },
  {
    path: 'thankyou',
    component: ThankyouComponent,
  },
];


@NgModule({
  declarations: [
    AppComponent,
    BootstrapComponent,
    RegisterComponent,
    InstructionComponent,
    DashboardComponent,
    LoginComponent,
    HomepageComponent,
    PanelComponent,
    QuestionsComponent,
    ThankyouComponent,
    ConfirmationPopupComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatDialogModule,
    StoreModule.forRoot(appRootReducer),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : [],
    NgxLoadingModule.forRoot({}),
    // NgxCaptchaModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationPopupComponent]
})
export class AppModule {
}
