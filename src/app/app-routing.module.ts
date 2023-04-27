import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { DisplayLoginComGuard } from './guards/display-login-com.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: "home", loadChildren: () => import('src/app/user/user.module').then(m => m.UserModule), canActivate: [AuthGuard] },
  { path: "dashboard", loadChildren: () => import('src/app/admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard] },
  { path: "auth", loadChildren: () => import('src/app/auth/auth.module').then(m => m.AuthModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
