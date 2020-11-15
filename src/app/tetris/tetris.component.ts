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
    var field = [[], [], [], [], [], [], [], []];
    document.getElementById('start').remove();
    const main = document.getElementById('raster');
    var newI;
    var newN;
    for (let i = 1; i < 9; i++){
      newI = i-1;
      field[newI][0] = false;
      for (let n = 1; n < 9; n++){
        newN = n;
        field[newI][newN - 1] = false;
        const div = document.createElement('div');
        div.style.gridColumn = n.toString();
        div.style.gridRow = i.toString();
        div.id = i + '/' + n;
        div.style.borderStyle='solid';
        div.style.borderColor='grey';
        div.style.borderWidth='2px';
        main?.appendChild(div);
      }
    }
    var gameAktive = true;
    while (gameAktive){
      console.log(Math.random());
      gameAktive = false;
    }
  }
}/* in while schleife
random zahl um die figur zu bestimmen
figur fällt durch einen intervall
if der nächste true dann stop und wieder von vorne
in while
chaeck ob eine reihe voll ist wenn ja dann alle
true blöcke einen nach unten durch durloopen der gesamten liste
dann wieder von vorne
dann wieder von vorne*/
