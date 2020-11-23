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
  fild: Array<item>;
  gameinterval;
  constructor() {
  }

  ngOnInit(): void {
  }
  startGame(){
    this.gameinterval = setInterval(() => {
      if (this.checkGame()){
        for (var i = 0; i< 7; i++)
        {}
      }
    },500)
  }
  checkGame(): boolean{
    return true;
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
    return paras;
    }
}
class item{
  positionid: string;
  color: string;
  bordercolor: string;
  status: number;
  constructor(){
    this.color = 'gainsboro';
    this.bordercolor = 'grey';
    this.status = 0;
  }
  colorSetter(color){
    if (color = 'gainsboro'){
      this.color = color;
      this.bordercolor = 'grey';
    }
    else{
      this.color  = color;
      this.bordercolor = color;
    }
  }

}
/* in while schleife
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
