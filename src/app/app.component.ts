import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { AuthService } from './services/auth.service';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'youth-meeting';
  auth: any = new BehaviorSubject(null);

  constructor(private fireauth: AngularFireAuth, private authService: AuthService, private updates: SwUpdate) {
    this.displayLoginCom.subscribe(
      (res: any) => {
        console.log(res);
      }
    )
    updates.available.subscribe(event => {
      // this.update = true;
      updates.activateUpdate().then(() => document.location.reload());
    })
  }

  get displayLoginCom() {
    return this.authService.authState$.pipe(
      map(authState => {
        if (authState) {
          this.auth = true
          return true;
        } else {
          this.auth = false
          return false;
        }
      })
    );
  }


  ngOnInit(): void {
    // if (this.updates.isEnabled) {
    //   this.updates.available.subscribe(event => {
    //     if (confirm('A new version is available. Would you like to update?')) {
    //       this.updates.activateUpdate().then(() => {
    //         document.location.reload();
    //       });
    //     }
    //   });
    // }


    // const app: any = document.querySelector("app-loading-page")
    // const div: any = document.querySelector("div")
    // setTimeout(() => {
    //   app.style.position = "absolute"
    //   app.style.transform = "translateY(-100%)"
    //   div.style.overflow = "auto"
    //   div.style.height = "auto"
    // }, 11000);

    // const navbar: any = document.querySelector('app-navbar');
    // const sidebar: any = document.querySelector('app-side-bar');
    // const navbarHeight: any = navbar.offsetHeight;
    // console.log(navbarHeight);
    // sidebar.style.height = `calc(100vh - ${navbarHeight}px)`
    // sidebar.style.display = `inline-block`
  }
}
