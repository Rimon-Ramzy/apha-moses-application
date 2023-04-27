import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Hymns } from 'src/app/model/hymn.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-hymns',
  templateUrl: './hymns.component.html',
  styleUrls: ['./hymns.component.scss']
})
export class HymnsComponent implements OnInit {
  hymnsList: Hymns[] = [];

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.getAllHymns();
  }

  getAllHymns() {
    this.dataService.getAllHymns().subscribe(
      (res: any) => {
        this.hymnsList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
      },
      () => {
        alert('Error while fetching student data')
      }
    )
  }

  showVideo(e: any) {
    const showerVideo: any = document.getElementById('showerVideo');
    const showerVideoName: any = document.getElementById('showerVideoName');
    const showerVideoDate: any = document.getElementById('showerVideoDate');
    showerVideo.src = e.target.children[0].src
    showerVideoName.innerHTML = e.target.children[1].innerHTML
    showerVideoDate.innerHTML = e.target.children[2].innerHTML
    console.log(e.target.children[1].innerHTML);
  }

}
