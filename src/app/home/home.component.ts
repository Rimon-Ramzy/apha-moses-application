import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor() {
    console.log("hi");

  }
  ngAfterViewInit(): void {
    // const app: any = document.querySelector("app-loading-page")
    // setTimeout(() => {
    //   // app.style.position = "absolute"
    //   // app.style.transform = "translateY(-40px)"
    //   console.log("hi");

    // }, 4000);

  }

  ngOnInit(): void {

  }

}
