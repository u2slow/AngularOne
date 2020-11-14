import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.css']
})
export class TetrisComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {}

  startGame(){
    document.getElementById('start').remove();
    const main = document.getElementById('raster');
    for (let i = 1; i < 9; i++){
      for (let n = 1; n < 9; n++){
        const div = document.createElement('div');
        div.style.gridColumn = n.toString();
        div.style.gridRow = i.toString();
        div.id = i + '/' + n;
        div.className = 'rasterElement';
        main?.appendChild(div);
      }
    }
  }

}
