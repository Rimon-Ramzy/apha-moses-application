import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Files } from 'src/app/model/file.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  filesList?: Files[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getAllFiles();
  }

  getAllFiles() {
    this.dataService.getAllFiles().subscribe(
      (res: any) => {
        this.filesList = res.map((e: any) => {
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
