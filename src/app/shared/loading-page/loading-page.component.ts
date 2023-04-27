import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Typed from 'typed.js';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.scss']
})
export class LoadingPageComponent implements OnInit, AfterViewInit {

  constructor(private router: Router) { }
  ngAfterViewInit(): void {
    const typingEle: any = document.querySelector(".typing-div");
    setTimeout(() => {
      typingEle.style.opacity = "1"
      let typing = new Typed(".typing", {
        strings: ["كنيسه البشارة والملاك غبريال", "خدمة الشباب"],
        typeSpeed: 60,
        backSpeed: 60,
        loop: true,
      })
    }, 3000);

  }

  ngOnInit(): void {

  }

}
