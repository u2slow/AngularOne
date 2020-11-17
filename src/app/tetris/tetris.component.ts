import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.css']
})
export class TetrisComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  field = [[], [], [], [], [], [], [], []];
  startGame(){
    document.getElementById('start').remove();
    const main = document.getElementById('raster');
    var newI;
    var newN;
    for (let i = 1; i < 9; i++){
      newI = i-1;
      this.field[newI][0] = false;
      for (let n = 1; n < 9; n++){
        newN = n;
        this.field[newI][newN - 1] = false;
        const div = document.createElement('div');
        div.style.gridColumn = n.toString();
        div.style.gridRow = i.toString();
        div.id = i + '/' + n;
        div.style.borderStyle='solid';
        div.style.borderColor='grey';
        div.style.borderWidth='2px';
        main?.appendChild(div);
      }
      var gamerun = true;
    }
    while (gamerun){
        const a = this.buildFigure();
        const gameinterval = setInterval(() => {
          for (let i = 0; i < 8; i++){
            for (let n = 0; i < 8; i++){
              if (this.field[i][n]){
                var item = document.getElementById(i.toString + '/'+ n.toString);
                item.style.backgroundColor = 'gainsboro';
                newI = i + 1;
              }
            }
          }
        }, 500);
        clearInterval(gameinterval);
        gamerun = false;
    }

  }
  buildFigure():number{
    const random = Math.random() * 7;
    if (random < 1){
      this.style('1/4','green');
      this.style('1/5','green');
      this.style('2/4','green');
      this.style('2/3','green');
      return 1;
    }
    else if (random > 1 && random < 2){
      this.style('1/4', 'yellow');
      this.style('2/4', 'yellow');
      this.style('3/4', 'yellow');
      this.style('3/5', 'yellow');
      return 2;
    }
    else if (random > 2 && random < 3){
      this.style('1/4', 'turquoise');
      this.style('1/5', 'turquoise');
      this.style('2/4', 'turquoise');
      this.style('2/5', 'turquoise');
      return 3;
    }
    else if (random > 3 && random < 4){
      this.style('1/4', 'blue');
      this.style('2/4', 'blue');
      this.style('3/4', 'blue');
      this.style('4/4', 'blue');
      return 4;
    }
    else if (random > 4 && random < 5){
      this.style('1/3', 'orange');
      this.style('1/4', 'orange');
      this.style('2/4', 'orange');
      this.style('2/5', 'orange');
      return 5;
    }
    else if (random > 5 && random < 6){
      this.style('1/4', 'grey');
      this.style('2/4', 'grey');
      this.style('3/4', 'grey');
      this.style('3/5', 'grey');
      return 6;
    }
    else if (random > 6){
      this.style('1/3', 'black');
      this.style('1/4', 'black');
      this.style('1/5', 'black');
      this.style('2/3', 'black');
      return 7;
    }
    }
    style(id, color){
      const item = document.getElementById(id);
      item.style.backgroundColor = color;
      item.style.borderColor = color;
      var i = id[0] - 1;
      var n = id[2] - 1;
      this.field[i][n] = true;
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
