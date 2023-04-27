import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  isAdmin$: Observable<boolean | null> = this.authService.isAdmin$;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const imgIcon: any = document.querySelector('.img-icon');
    const icons: any = document.querySelector('.icons');
    const imgIconHeight: any = imgIcon.offsetWidth;
    icons.style.width = `${imgIconHeight}px`
    console.log(imgIconHeight);
  }

  openSidebar() {
    const icons: any = document.querySelector('.icons');
    icons.classList.toggle('full-width')
  }

  signOut() {
    this.authService.signout();
  }

}
