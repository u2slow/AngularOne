import { VideoDBService } from './../shred/video-db.service';
import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { inject } from '@angular/core/testing';
import { config } from 'process';
import { Config } from 'protractor';


@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css']
})
export class SecondComponent implements OnInit {
  array = ['Hallo', 'ich', 'bin'];
  isGreen = false;
  videos = [];
  @Output() meinEmitter = new EventEmitter();


  constructor(datnebank: VideoDBService, @Inject('VideoComponentConfig') config: string) {
    this.videos = datnebank.getVideos();
    console.log(config);
   }

  ngOnInit(): void {
  }
  myClickHandler(){
    window.alert(this.videos);
    this. meinEmitter.emit();
  }


}
