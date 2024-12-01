import { Component, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './SystemPages/login-page/login-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessagesModule } from 'primeng/messages';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/Login',
    pathMatch: 'full',
  },
  {
    path: 'Login',
    component: LoginPageComponent
  },
  {
    path: 'Systems',  loadChildren: () => import('./layouts/layouts.module').then(m => m.LayoutsModule)  
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextModule,
    PasswordModule,
    MessagesModule,
  ],
  exports: [
    RouterModule,
    LoginPageComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
