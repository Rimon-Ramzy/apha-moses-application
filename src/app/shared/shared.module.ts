import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingPageComponent } from './loading-page/loading-page.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SideBarComponent } from './side-bar/side-bar.component';


const component = [
  LoadingPageComponent,
  NavbarComponent,
  SideBarComponent
]

const routers: Routes = [
  { path: "loading", component: LoadingPageComponent }
]

@NgModule({
  declarations: [
    component,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routers)
  ],
  exports: [
    component
  ]
})
export class SharedModule { }
