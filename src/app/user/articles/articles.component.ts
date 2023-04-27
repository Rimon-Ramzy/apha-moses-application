import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  articlesList?: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getAllArticles();
  }

  getAllArticles() {
    this.dataService.getAllArticles().subscribe(
      (res: any) => {
        this.articlesList = res.map((e: any) => {
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
