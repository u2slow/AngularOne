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
  field: Array<Array<Item>> = [[new Item(), new Item(), new Item(), new Item(), new Item(), new Item(), new Item(), new Item()],
                               [new Item(), new Item(), new Item(), new Item(), new Item(), new Item(), new Item(), new Item()],
                               [new Item(), new Item(), new Item(), new Item(), new Item(), new Item(), new Item(), new Item()],
                               [new Item(), new Item(), new Item(), new Item(), new Item(), new Item(), new Item(), new Item()],
                               [new Item(), new Item(), new Item(), new Item(), new Item(), new Item(), new Item(), new Item()],
                               [new Item(), new Item(), new Item(), new Item(), new Item(), new Item(), new Item(), new Item()],
                               [new Item(), new Item(), new Item(), new Item(), new Item(), new Item(), new Item(), new Item()],
                               [new Item(), new Item(), new Item(), new Item(), new Item(), new Item(), new Item(), new Item()]];
  gameinterval: any;
  haveparas = false;
  paras;
  originalPras;
  constructor() {
  }

  ngOnInit(): void {
  }
  startGame(){
    document.getElementById('start').remove();
    for (let i = 0; i < 8; i++){
      for (let k = 0; k < 8; k++){
        const elemet = document.getElementById('raster');
        const newElement = document.createElement('div');
        const id = String(i) + '/' + String(k);
        newElement.id = id;
        newElement.style.gridColumn = String(k + 1);
        newElement.style.gridRow = String(i + 1);
        elemet.appendChild(newElement);
        this.field[i][k].positionid = String(id);
        this.field[i][k].colorSetter('gainsboro');
      }
    }
    this.style();
    console.log (this.field);
    this.gameinterval = setInterval(() => {
      if (this.checkGame()){
        if (!this.haveparas){
          this.originalPras = this.buildFigure();
          this.paras = this.originalPras;
          console.log(this.paras);
          this.haveparas = true;
        }
        this.editparas();
        console.log(this.paras);
        console.log(this.originalPras);
        this.fallfigures();
        this.style();
      }
    }, 500);
  }
  fallfigures(){
    for (let i = 0; i < 4; i++){
      console.log(Number(this.originalPras[i][0]));
      console.log(this.field[Number(this.originalPras[i][0])][Number(this.originalPras[i][1])].status);
      this.field[Number(this.originalPras[i][0])][Number(this.originalPras[i][1])].status = 0;
      this.field[Number(this.originalPras[0])][Number(this.field[1])].colorSetter('gainsboro');
      this.originalPras[i] = String(Number(this.originalPras[i][0]) + 1);
      this.field[Number(this.originalPras[0])][Number(this.field[1])].status = 2;
      this.field[Number(this.originalPras[0])][Number(this.field[1])].colorSetter(this.originalPras[4]);
    }
  }
  editparas(){
    // tslint:disable-next-line: forin
    var maches: Array<string> = [];
    for (let i in this.paras){
      if (this.paras[i] === undefined){
        continue;
      }
      for (let k in this.paras){
        if (i === k){
          continue;
        }
        if (this.paras[k] === undefined){
          continue;
        }
        if (this.paras[k][1] === this.paras[i][1]){
          maches.push(String(this.paras[i]) + '/' + String(this.paras[k]));
          delete(this.paras[i]);
        }
      }
      var newParas = [];
      for (let i of this.paras){
        if (i === undefined){
          continue;
        }
        newParas.push(i);
      }
      this.paras = newParas;
    }
  }
  checkGame(): boolean{
    return true;
  }
  style(){
    for (let i = 0; i < 8; i++){
      for (let k = 0; k < 8; k++){
        const elemet = document.getElementById(this.field[i][k].positionid);
        elemet.style.borderStyle = 'solid';
        elemet.style.backgroundColor = this.field[i][k].color;
        elemet.style.borderColor = this.field[i][k].bordercolor;
      }
    }
  }
  buildFigure(): Array<string>{
    const random = Math.random() * 5;
    let paras = [];
    if (random < 1){
      paras = ['03', '04', '14', '15', 'green'];
    }
    else if (random > 1 && random < 2){
      paras = ['03', '13', '23', '24', 'yellow'];
    }
    else if (random > 2 && random < 3){
      paras = ['03', '04', '13', '14', 'turquoise'];
    }
    else if (random > 3 && random < 4){
      paras = ['03', '13', '23', '33', 'blue'];
    }
    else if (random > 4 && random < 5){
      paras = ['02', '03', '13', '14', 'orange'];
    }
    else if (random > 5 && random < 6){
      paras = ['03', '13', '23', '25', 'grey'];
    }
    else if (random > 6){
      paras = ['02', '03', '14', '12', 'black'];
    }
    for (let i = 0; i < 4; i++){
      this.field[Number(paras[i][0])][Number( paras[i][1])].colorSetter(paras[4]);
      this.field[Number(paras[i][0])][Number( paras[i][1])].status = 2;
    }
    return paras;
    }
}
class Item{
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
    if (color === 'gainsboro'){
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
