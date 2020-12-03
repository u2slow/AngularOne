import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { range } from 'rxjs';
import { strict } from 'assert';
import { stringify } from 'querystring';
import { NumberSymbol } from '@angular/common';
import { newArray } from '@angular/compiler/src/util';

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
          this.haveparas = true;
          this.style();
        }
        else{
          this.editparas();
          if (this.checkParas()){
            this.style();
            this.fallfigures();
            console.log(this.field);
            this.style();
          }
          else{
            for (let i = 0; i < 4; i++){
              this.field[Number(this.originalPras[i][0])][Number(this.originalPras[i][1])].status = 1;
            }
          }
        }
      }
    }, 1000);
  }
  checkParas(){
    // tslint:disable-next-line: forin
    for (let i in this.paras){
      if (Number(this.paras[i][0]) + 1 > 7){
        this.haveparas = false;
        console.log('jo alles falsch');
        return false;
      }
      if (this.field[Number(this.paras[i][0]) + 1][Number(this.paras[i][1])].status === 1){
        this.haveparas = false;
        console.log('jo alles falsch');
        return false;
      }
    }
    return true;
  }
  fallfigures(){
    for (let i = 0; i < 4; i++){
      this.field[Number(this.originalPras[i][0])][Number(this.originalPras[i][1])].colorSetter('gainsboro');
      this.originalPras[i] = String(Number(this.originalPras[i][0]) + 1) + this.originalPras[i][1];
    }
    for (let i = 0; i < 4; i++){
      this.field[Number(this.originalPras[i][0])][Number(this.originalPras[i][1])].colorSetter(this.originalPras[4]);
      this.field[Number(this.originalPras[i][0])][Number(this.originalPras[i][1])].status = 2;
    }
    console.log(this.originalPras);
  }
  editparas(){
    var paras = new Array();
    // tslint:disable-next-line: forin
    for (const k in this.originalPras){
      if (Number(k) === 4){
        break;
      }
      paras.push(this.originalPras[k]);
    }
    this.paras = [];
    var dimesion = [new Array(), new Array(), new Array(), new Array()];
    var counter = 0;
    for (let i of paras){
      for (let k in dimesion){
        if (dimesion[k][0] === undefined){
          dimesion[k].push(i);
          break;
        }
        else if (dimesion[k][0][1] === i[1]){
          dimesion[k].push(i);
          break;
        }
      }
    }
    for (let i of dimesion){
      if (i[0] === undefined){
        continue;
      }
      let max = '00';
      for (let k of i){
        if (max[0] <= k[0]){
          max = k;
        }
      }
      this.paras.push(max);
    }
  }
  checkGame(): boolean{
    for (let i = 0; i < 3; i++){
      if (this.field[1][i].status === 1){
        console.log('Loooooose');
        return false;
      }
      if (this.field[0][i].status === 1){
        console.log('Loooooose');
        return false;
      }
    }
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
    let random = Math.random() * 5;
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
      this.status = 0;
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
