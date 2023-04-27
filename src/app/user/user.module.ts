import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HymnsComponent } from './hymns/hymns.component';
import { VideosComponent } from './videos/videos.component';
import { FilesComponent } from './files/files.component';
import { ArticlesComponent } from './articles/articles.component';
import { RouterModule, Routes } from '@angular/router';
import { SafePipe } from '../pipes/safe.pipe';

const routers: Routes = [
  { path: '', redirectTo: 'hymns', pathMatch: 'full' },
  { path: 'hymns', component: HymnsComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'files', component: FilesComponent },
  { path: 'articles', component: ArticlesComponent },
]

@NgModule({
  declarations: [
    HymnsComponent,
    VideosComponent,
    FilesComponent,
    ArticlesComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routers)
  ],
})
export class UserModule { }
