import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoDBService {
  videos: string[];
  constructor() {
    this.videos = ['Angular', 'TS', 'JS'];
   }

   getVideos(){
     return this.videos;
   }
}
