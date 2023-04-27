export class Files {
  id: string = '';
  name: string = '';
  url: string = '';
  date: string = '';
  file: File;
  size: number = 0;
  constructor(file: File) {
    this.file = file
  }
}
