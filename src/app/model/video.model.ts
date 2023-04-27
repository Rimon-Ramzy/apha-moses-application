export class Videos {
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
