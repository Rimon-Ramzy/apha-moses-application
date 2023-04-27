import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Hymns } from '../model/hymn.model';
import { Files } from '../model/file.model';
import { Article } from '../model/article.model';
import { Videos } from '../model/video.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: AngularFirestore, private firestorage: AngularFirestore) { }

  addVideo(hymnsObj: Hymns) {
    hymnsObj.id = this.firestore.createId();
    return this.firestore.collection('hymns').add(hymnsObj);
  }

  addArticle(articleObj: Article) {
    articleObj.id = this.firestore.createId();
    return this.firestore.collection('articles').add(articleObj);
  }

  saveMetaDataOfFile(file: Files) {
    const fileMeta = {
      id: "",
      name: file.name,
      url: file.url,
      date: file.date,
    }
    fileMeta.id = this.firestore.createId();
    this.firestore.collection('files').add(fileMeta)
  }

  saveVideosOfFile(video: Videos) {
    const fileMeta = {
      id: "",
      name: video.name,
      url: video.url,
      date: video.date,
    }
    fileMeta.id = this.firestore.createId();
    this.firestore.collection('videos').add(fileMeta)
  }

  getAllHymns() {
    return this.firestore.collection('hymns').snapshotChanges();
  }
  getAllVideos() {
    return this.firestore.collection('videos').snapshotChanges();
  }
  getAllFiles() {
    return this.firestore.collection('files').snapshotChanges();
  }
  getAllArticles() {
    return this.firestore.collection('articles').snapshotChanges();
  }

}
