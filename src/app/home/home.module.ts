import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


const component = [
  HomeComponent
]

const routers: Routes = [
  { path: "", component: HomeComponent }
]

@NgModule({
  declarations: [
    component
  ],
  imports: [
    CommonModule,
    // SharedModule,
    RouterModule.forChild(routers)
  ],
  exports: [
    component
  ]
})
export class HomeModule { }
