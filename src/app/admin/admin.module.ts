import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';


const routers: Routes = [
  { path: "", component: DashboardComponent }
]

const component = [
  DashboardComponent
]

@NgModule({
  declarations: [
    component
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routers)
  ],
  exports: [
    component
  ]
})
export class AdminModule { }
