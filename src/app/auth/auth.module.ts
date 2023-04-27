import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';

const routers: Routes = [
  { path: "", redirectTo: '/login', pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent }
]

const component = [
  LoginComponent
]

@NgModule({
  declarations: [
    component,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routers)
  ]
})
export class AuthModule { }
