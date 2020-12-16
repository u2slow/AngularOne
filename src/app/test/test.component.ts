import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor() { }
  originalPras = ['42','32','33','32','green','33'];
  ngOnInit(): void {
  }
  rotate(){
    for (let i in this.originalPras){
      console.log(i);
    }
  }
  style(id){
    console.log(id[0],id[2]);
  }
}
