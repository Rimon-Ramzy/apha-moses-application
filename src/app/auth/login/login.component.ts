import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = ''
  password: string = ''
  promptEvent: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    window.addEventListener('beforeinstallprompt', event => {
      this.promptEvent = event
    })
  }

  installPwa(): void {
    this.promptEvent.prompt();
  }

  login() {
    const emailErr: any = document.getElementById("emailErr");
    const passwordErr: any = document.getElementById("passwordErr");
    if (this.email == '') {
      emailErr.classList.remove('d-none')
    } else {
      emailErr.classList.add('d-none')
    }
    if (this.password == '') {
      passwordErr.classList.remove('d-none')
    } else {
      passwordErr.classList.add('d-none')
    }
    this.authService.login(this.email, this.password);

  }



}
