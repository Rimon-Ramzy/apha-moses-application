import { Component, OnInit } from '@angular/core';
import { Videos } from 'src/app/model/video.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  videosList: Videos[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getAllVideos();
  }

  getAllVideos() {
    this.dataService.getAllVideos().subscribe(
      (res: any) => {
        this.videosList = res.map((e: any) => {
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


}
