import { element } from 'protractor';
import { Component, OnInit, HostListener  } from '@angular/core';
import { range } from 'rxjs';
import { strict } from 'assert';
import { stringify } from 'querystring';
import { NumberSymbol } from '@angular/common';
import { newArray } from '@angular/compiler/src/util';
import { hasLifecycleHook } from '@angular/compiler/src/lifecycle_reflector';

export enum KEY_CODE {
  RIGHT_ARROW = 'ArrowRight',
  LEFT_ARROW = 'ArrowLeft',
  ArrowDown = 'ArrowDown',
  ArrowUp = 'ArrowUp'
}

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
  button;
  constructor() {
  }

  ngOnInit(): void {
  }
  startGame(){
    this.button = document.getElementById('start');
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
    this.game();
  }
  game(){
    this.gameinterval = setInterval(() => {
      if (this.checkGame()){
        if (!this.haveparas){
          this.checkLine;
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
            this.checkLine();
            this.style();
          }
          else{
            for (let i = 0; i < 4; i++){
              this.field[Number(this.originalPras[i][0])][Number(this.originalPras[i][1])].status = 1;
            }
          }
        }
      }
      else {
        for (let i = 0; i < 8; i++){
          for (let k = 0; k < 8; k++){
            const id = String(i) + '/' + String(k);
            document.getElementById(id).remove();
          }
        }
        const element = document.getElementById('raster');
        element.appendChild(this.button);
        clearInterval(this.gameinterval);
      }
    }, 1000);
  }
  checkLine(){
    let counter;
    for (let i = 0;i < 8; i++){
      counter = 0;
      for(let k = 0;k < 8; k++){
        if (this.field[i][k].status == 1){
          counter++;
        }
      }
      if (counter == 8){
        console.log('lolololololololololo');
        for(let k = 0;k < 8; k++){
          this.field[i][k].colorSetter('gainsboro');
        }
        for(let k = i; k > 0; k--){
          for(let l = 0; l < 8; l++){
            if (this.field[k][l].status = 1){
              this.field[Number(k+1)][l].colorSetter(this.field[k][l].color);
              this.field[Number(k+1)][l].status = 1;
              this.field[k][l].colorSetter('gainsboro');
            }
          }
        }
      }
    }
  }
  rotate(){
    if (this.originalPras[4] != 'turquoise'){
      console.log(this.originalPras);
      for (let i = 0; i < 4; i++){
        this.field[Number(this.originalPras[i][0])][Number(this.originalPras[i][1])].colorSetter('gainsboro');
        const x = Number(this.originalPras[i][1]);
        const y = Number(this.originalPras[i][0]);
        const offset_x = Number(this.originalPras[5][1]);
        const offset_y = Number(this.originalPras[5][0]);
        const adjusted_x = x - offset_x;
        const adjusted_y = y - offset_y;
        const cos_rad = 0;
        const sin_rad = 1;
        const qx = offset_x + cos_rad * adjusted_x + sin_rad * adjusted_y;
        const qy = offset_y + -sin_rad * adjusted_x + cos_rad * adjusted_y;
        this.originalPras[i] = String(qy) + String(qx);
    }
    }
    for (let i = 0; i < 4; i++){
      this.field[Number(this.originalPras[i][0])][Number(this.originalPras[i][1])].colorSetter(this.originalPras[4]);
      this.field[Number(this.originalPras[i][0])][Number(this.originalPras[i][1])].status = 2;
    }
    this.style();
  }
  fallInstant(){
    clearInterval(this.gameinterval);
    console.log('Hallo')
    this.haveparas = false;
    const intervall = setInterval(() => {
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
        console.log('Stooooooooooooooooooooooooooooooooooooooooooooooop');
        clearInterval(intervall);
        this.game();
      }
    }, 200);
  }
  turnRight(){
    let check = true;
    for (let i = 0; i < 4; i++){
      if (Number(this.originalPras[i][1]) + 1 > 7){
        check = false;
        break;
      }
    }
    if (check){
      for (let i = 0; i < 4; i++){
        var para = Number(this.originalPras[i][1]) + 1;
        this.field[Number(this.originalPras[i][0])][Number(this.originalPras[i][1])].colorSetter('gainsboro');
        this.originalPras[i] = this.originalPras[i][0] + String(para);
      }
      for (let i = 0; i < 4; i++){
        this.field[Number(this.originalPras[i][0])][Number(this.originalPras[i][1])].colorSetter(this.originalPras[4]);
        this.field[Number(this.originalPras[i][0])][Number(this.originalPras[i][1])].status = 2;
      }
    }
    this.style();
  }
  turnLeft(){
    let check = true;
    for (let i = 0; i < 4; i++){
      var para = Number(this.originalPras[i][1]) - 1;
      if (para < 0){
        check = false;
        break;
      }
    }
    if (check){
      for (let i = 0; i < 4; i++){
        var para = Number(this.originalPras[i][1]) - 1;
        this.field[Number(this.originalPras[i][0])][Number(this.originalPras[i][1])].colorSetter('gainsboro');
        this.originalPras[i] = this.originalPras[i][0] + String(para);
      }
      for (let i = 0; i < 4; i++){
        this.field[Number(this.originalPras[i][0])][Number(this.originalPras[i][1])].colorSetter(this.originalPras[4]);
        this.field[Number(this.originalPras[i][0])][Number(this.originalPras[i][1])].status = 2;
      }
    }
    this.style();
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
    this.originalPras[5] = String(Number(this.originalPras[5][0]) + 1) + this.originalPras[5][1];
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
    for (let i = 2; i < 5; i++){
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
    random = 2.5;
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
    if (paras[4] === 'turquoise'){
      paras.push('NA')
    }
    else{
      paras.push('13');
    }
    for (let i = 0; i < 4; i++){
      this.field[Number(paras[i][0])][Number( paras[i][1])].colorSetter(paras[4]);
      this.field[Number(paras[i][0])][Number( paras[i][1])].status = 2;
    }
    return paras;
    }
    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
      console.log(event);

      if (event.key === KEY_CODE.RIGHT_ARROW) {
        this.turnRight();
      }

      if (event.key === KEY_CODE.LEFT_ARROW) {
        this.turnLeft();
      }
      if (event.key === KEY_CODE.ArrowDown){
        this.fallInstant();
      }
      if (event.key === KEY_CODE.ArrowUp){
        this.rotate();
      }
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
      this.status = 1;
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
