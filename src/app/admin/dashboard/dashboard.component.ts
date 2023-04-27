import { Component, OnInit } from '@angular/core';
import { Hymns } from 'src/app/model/hymn.model';
import { Files } from 'src/app/model/file.model';
import { DataService } from 'src/app/services/data.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { Article } from 'src/app/model/article.model';
import { Videos } from 'src/app/model/video.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  navHeight: any = '';
  allDate: any = '';

  hymnInput: any = '';
  hymnName: any = '';
  hymnoObj: Hymns = {
    id: '',
    name: '',
    url: '',
    date: ''
  }

  videoName: any = '';
  videoInput: any = '';
  selectedVideos!: FileList;
  currentVideoUpload!: Videos;
  percentageVideo: number = 0;

  fileInput: any = '';
  fileName: any = '';
  currentFileUpload!: Files;
  selectedFiles!: FileList;
  percentage: number = 0;

  articleName: any = '';
  articleInput: any = '';
  articleObj: Article = {
    id: '',
    name: '',
    text: '',
    date: ''
  }

  typeInput: any = '';

  hymnsList?: any;
  videosList?: any;
  filesList?: any;
  articlesList?: any;

  hymnNameForUpdate?: string;
  hymnUrlForUpdate?: string;
  hymnIdForUpdate?: string;
  articleNameForUpdate?: string;
  articleUrlForUpdate?: string;
  articleIdForUpdate?: string;

  name: string = '';
  email: string = '';
  password: string = '';


  constructor(private dataService: DataService, private firestorage: AngularFireStorage, private firestore: AngularFirestore, private authService: AuthService) {
  }

  ngOnInit(): void {
    const date = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    this.allDate = `${month} - ${day} - ${year}`

    const dashboard: any = document.getElementById('dashboard');
    this.navHeight = Number(localStorage.getItem('youthMeetingNavHeight'));
    dashboard.style.height = `calc(100vh - ${this.navHeight}px)`

    this.getAllHymns();
    this.getAllVideos();
    this.getAllFiles();
    this.getAllArticles();
  }

  download() {
    const urlInput: any = document.querySelector(".urlInput")
    const btnDownload: any = document.querySelector(".btnDownload")
    this.fetchFile(urlInput.value);
    btnDownload.innerHTML = 'Doanloading File ...'
  }
  fetchFile(url: any) {
    const btnDownload: any = document.querySelector(".btnDownload")
    fetch(url).then(res => res.blob()).then(file => {
      let tempURL = URL.createObjectURL(file);
      let aTag = document.createElement('a');
      aTag.href = tempURL;
      // aTag.download = url.replace(/^[\\\/]/, '');
      // aTag.download = 'fileName';
      aTag.download = 'filename';
      document.body.appendChild(aTag);
      aTag.click();
      aTag.remove();
      URL.revokeObjectURL(tempURL);
      btnDownload.innerHTML = 'Doanlodaed file'
    }).catch(() => {
      btnDownload.innerHTML = 'Download'
      alert('faild to doanload file !')
    })
  }

  chooseType(e: any) {
    this.typeInput = e.target.value;
  }

  chooseFile() {
    const btn: any = document.querySelector(".fileInput");
    btn.click();
  }
  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }
  changeFileLabel(e: any) {
    const chooseFileLabel: any = document.getElementById('chooseFileLabel');
    chooseFileLabel.innerHTML = `${e.target.value.split("\\")[2]}`
  }

  chooseVideo() {
    const btn: any = document.querySelector(".videoInput");
    btn.click();
  }
  selectVideo(event: any) {
    this.selectedVideos = event.target.files;
  }
  changeVideoLabel(e: any) {
    const chooseVideoLabel: any = document.getElementById('chooseVideoLabel');
    chooseVideoLabel.innerHTML = `${e.target.value.split("\\")[2]}`
  }

  submitHymns() {
    this.hymnoObj.id = "";
    this.hymnoObj.name = this.hymnName;
    this.hymnoObj.url = this.hymnInput;
    this.hymnoObj.date = this.allDate;
    this.dataService.addVideo(this.hymnoObj);
  }

  uploadVideo(e: any) {
    console.log("video");

    this.currentVideoUpload = new Videos(this.selectedVideos[0]);
    const path = 'video/' + this.currentVideoUpload.file.name
    const storageRef = this.firestorage.ref(path);
    const uploadTask = storageRef.put(this.selectedVideos[0]);

    uploadTask.snapshotChanges().pipe(finalize(() => {
      storageRef.getDownloadURL().subscribe(downloadLink => {
        this.currentVideoUpload.id = '';
        this.currentVideoUpload.url = downloadLink;
        this.currentVideoUpload.size = this.currentVideoUpload.file.size;
        this.currentVideoUpload.name = this.videoName;
        this.currentVideoUpload.date = this.allDate;
        this.dataService.saveVideosOfFile(this.currentVideoUpload);
      })
    })
    ).subscribe((res: any) => {
      this.percentage = (res.bytesTransferred * 100 / res.totalBytes);
      e.target.innerHTML = '...يتم رفع الفيديو';
      e.target.style.backgroundColor = '#87ACDC';
      e.target.setAttribute('disabled', 'disabled');
      if (this.percentage == 100) {
        e.target.innerHTML = 'رفع الفيديو';
        e.target.style.backgroundColor = '#4662AB';
        e.target.removeAttribute('disabled');
      }
    }, err => {
      console.log('Error occured');
    })

  }

  uploadFile(e: any) {
    this.currentFileUpload = new Files(this.selectedFiles[0]);
    const path = 'file/' + this.currentFileUpload.file.name;

    const storageRef = this.firestorage.ref(path);
    const uploadTask = storageRef.put(this.selectedFiles[0]);

    uploadTask.snapshotChanges().pipe(finalize(() => {
      storageRef.getDownloadURL().subscribe(downloadLink => {
        this.currentFileUpload.id = '';
        this.currentFileUpload.url = downloadLink;
        this.currentFileUpload.size = this.currentFileUpload.file.size;
        this.currentFileUpload.name = this.fileName;
        this.currentFileUpload.date = this.allDate;

        this.dataService.saveMetaDataOfFile(this.currentFileUpload);
      })
    })
    ).subscribe((res: any) => {
      this.percentage = (res.bytesTransferred * 100 / res.totalBytes);
      e.target.innerHTML = '...يتم رفع الملف';
      e.target.style.backgroundColor = '#87ACDC';
      e.target.setAttribute('disabled', 'disabled');
      if (this.percentage == 100) {
        e.target.innerHTML = 'رفع الملف';
        e.target.style.backgroundColor = '#4662AB';
        e.target.removeAttribute('disabled');
      }
    }, err => {
      console.log('Error occured');
    });
  }

  submitArticles() {
    this.articleObj.id = "";
    this.articleObj.name = this.articleName;
    this.articleObj.text = this.articleInput;
    this.articleObj.date = this.allDate;
    this.dataService.addArticle(this.articleObj);
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

  deleteHymn(hymn: Hymns) {
    if (window.confirm('Are you sure you want to delete ' + hymn.name + '?')) {
      this.firestore.collection("hymns").doc(hymn.id).delete();
      this.ngOnInit();
    }
  }
  deleteVideo(video: Videos) {
    if (window.confirm('Are you sure you want to delete ' + video.name + '?')) {
      this.firestore.collection("videos").doc(video.id).delete();
      this.firestorage.ref(`video/${video.name}`).delete();
      this.ngOnInit();
    }
  }
  deletefile(file: Files) {
    if (window.confirm('Are you sure you want to delete ' + file.name + '?')) {
      this.firestore.collection("files").doc(file.id).delete();
      this.firestorage.ref(`file/${file.name}`).delete();
      this.ngOnInit();
    }
  }
  deletearticle(article: Article) {
    if (window.confirm('Are you sure you want to delete ' + article.name + '?')) {
      this.firestore.collection("articles").doc(article.id).delete();
      this.ngOnInit();
    }
  }

  popupdateHymn(hymn: Hymns) {
    this.hymnNameForUpdate = hymn.name;
    this.hymnUrlForUpdate = hymn.url;
    this.hymnIdForUpdate = hymn.id;
  }
  updateHymn() {
    const db = getFirestore();
    const docRef = doc(db, "hymns", `${this.hymnIdForUpdate}`);
    const data = {
      name: this.hymnNameForUpdate,
      url: this.hymnUrlForUpdate,
      date: this.allDate,
    }
    setDoc(docRef, data)
      .then(docRef => {
        alert('تم تعديل الترنيمة')
      })
      .catch(error => {
        alert(error);
      })
  }
  popupdateArticle(article: Article) {
    this.articleNameForUpdate = article.name;
    this.articleUrlForUpdate = article.text;
    this.articleIdForUpdate = article.id;
  }
  updateArticle() {
    const db = getFirestore();
    const docRef = doc(db, "articles", `${this.articleIdForUpdate}`);
    const data = {
      name: this.articleNameForUpdate,
      url: this.articleUrlForUpdate,
      date: this.allDate,
    }
    setDoc(docRef, data)
      .then(docRef => {
        alert('تم تعديل المقالة')
      })
      .catch(error => {
        alert(error);
      })
  }

  register() {
    this.authService.registerAdmin(this.email, this.password, this.name);
  }
}
