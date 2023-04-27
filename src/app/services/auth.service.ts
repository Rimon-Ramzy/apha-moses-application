import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any = new BehaviorSubject(null)

  constructor(private aAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
  }

  authState$: Observable<firebase.default.User | null> = this.aAuth.authState;

  displayName$: Observable<string | null> = this.authState$.pipe(
    map((user) => {
      return !user ? null : user.displayName;
    })
  )

  isAdmin$: Observable<boolean | null> = this.authState$.pipe(
    switchMap(user => {
      return !user ? observableOf(false) : this.db.object<boolean>('/user/' + user.uid + '/isAdmin/').valueChanges();
    })
  )

  saveUserData() {
    let state = localStorage.getItem('youthMeetingAuth');
    this.userData.next(state)
  }

  register(email: string, password: string, name: any) {
    this.aAuth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        this.db.object<any>('/user/' + res.user?.uid)
          .update(
            {
              uid: res.user?.uid,
              name: name,
              email: email,
              // isAdmin: false,
            }
          )
        alert("Registration Successful");
        this.signout();
        this.router.navigate(['/auth/login']);
      },
    ).catch(
      (err) => {
        alert(err.message);
        this.router.navigate(['/register'])
      }
    )
  }

  registerAdmin(email: string, password: string, name: any) {
    this.aAuth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        this.db.object<any>('/user/' + res.user?.uid)
          .update(
            {
              uid: res.user?.uid,
              name: name,
              email: email,
              isAdmin: true,
            }
          )
        alert("Registration Successful");
        this.signout();
        this.router.navigate(['/auth/login']);
      },
    ).catch(
      (err) => {
        alert(err.message);
        this.router.navigate(['/register'])
      }
    )
  }


  login(email: string, password: string) {
    this.aAuth.signInWithEmailAndPassword(email, password)
      .then(
        (res: any) => {
          this.router.navigate(['/home'])
          localStorage.setItem("youthMeetingAuth", 'true')
        }
      )
      .catch(
        (err) => {
          alert(err.message)
        }
      )
  }

  signout() {
    this.aAuth.signOut().then(
      () => {
        this.router.navigate(['/auth/login']);
        localStorage.removeItem("youthMeetingAuth")
      }
    ).catch(
      (err) => {
        alert(err.message);
      }
    )
  }



}
