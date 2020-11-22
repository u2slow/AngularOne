import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { range } from 'rxjs';
import { strict } from 'assert';
import { stringify } from 'querystring';
import { NumberSymbol } from '@angular/common';

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
  gameinterval;
  startGame(){
    document.getElementById('start').remove();
    const main = document.getElementById('raster');
    var newI;
    var newN;
    for (let i = 1; i < 9; i++){
      newI = i-1;
      this.field[newI][0] = 0;
      for (let n = 1; n < 9; n++){
        newN = n;
        this.field[newI][newN - 1] = 0;
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
    this.gameloop();

  }
  gameloop(){
    var a = this.buildFigure();
    var oldA = a;
    this.gameinterval = setInterval(() => {
      for (let i = 0; i < 4; i++){
        this.styleback(a[i]);
        a[i] = String(Number(a[i][0]) + 1) + a[i].substr(1, 2);
        if (a[i][0] === '8'){
          this.stop(a);
        }

      }
      for (let i = 0; i < 4; i++){
        this.style(a[i], a[4]);
      }
    }, 100);
  }
  stop(a){
    clearInterval(this.gameinterval);
    for (let i = 0; i < 3; i++){
      var n = Number(a[i][0]);
      var k = Number(a[i][2]);
      console.log(n,k);
      console.log(this.field);
      this.field[n][k] = 1;
    }
    console.log(this.field);
    this.gameloop();
  }
  buildFigure():string[]{
    const random = Math.random() * 7;
    var paras = [];
    if (random < 1){
      paras = ['1/4', '1/5', '2/4', '2/3', 'green'];
    }
    else if (random > 1 && random < 2){
      paras = ['1/4', '2/4', '3/4', '3/5', 'yellow'];
    }
    else if (random > 2 && random < 3){
      paras = ['1/4', '1/5', '2/4', '2/5', 'turquoise'];
    }
    else if (random > 3 && random < 4){
      paras = ['1/4', '2/4', '3/4', '4/4', 'blue'];
    }
    else if (random > 4 && random < 5){
      paras = ['1/3', '1/4', '2/4', '2/5', 'orange'];
    }
    else if (random > 5 && random < 6){
      paras = ['1/4', '2/4', '3/4', '3/5', 'grey'];
    }
    else if (random > 6){
      paras = ['1/3', '1/4', '1/5', '2/3', 'black'];
    }
    for (let i = 0; i < 4; i++){
      this.style(paras[i], paras[4]);
    }
    return paras;
    }
    style(id, color){
      const item = document.getElementById(id);
      item.style.backgroundColor = color;
      item.style.borderColor = color;
      const i = id[0] - 1;
      const n = id[2] - 1;
      this.field[i][n] = 2;
    }
    styleback(id){
      const item = document.getElementById(id);
      item.style.backgroundColor = 'gainsboro';
      item.style.borderColor = 'grey';
      const i = id[0] - 1;
      const n = id[2] - 1;
      this.field[i][n] = 0;
    }
}/* in while schleife
random zahl um die figur zu bestimmen
figur fällt durch einen intervall
if der nächste true dann stop und wieder von vorne
in while
chaeck ob eine reihe voll ist wenn ja dann alle
true blöcke einen nach unten durch durloopen der gesamten liste
dann wieder von vorne
dann wieder von vorne

buildfigure

in den if abschnitten muss nur die jewaligen ids in einem Array gespeihcert werden und dann
 am wnde styöe() diese Arry dann an den Intervall ao spart man sich das loopen durch das ganze
 feld*/
