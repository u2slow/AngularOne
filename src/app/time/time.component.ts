import { NodeWithI18n } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { time } from 'console';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {
  timerleft: number = 240;
  minuten: number = 1;
  isrunnig = false;
  interval;
  breakinterval;
  breaktimesek = 0;
  breakoutput = this.minuten.toString() + 'm ' + this.breaktimesek.toString() + 'sec';
  infoswitch: String = this.breakoutput;
  showmin = true;
  firstTime = true;

  ngOnInit(): void {
  }

  startTimer(){
    this.interval= setInterval(() => {
      if (this.isrunnig){
      if (this.timerleft > 0){
        this.timerleft--;
        this.infoswitch = this.timerleft.toString();
      }
      else{
        this.timerleft = 240;
        this.minuten ++;
        this.infoswitch = this.timerleft.toString();
      }
      }
    }, 1000 )
  }
  breaktimer(){
    this.breakinterval = setInterval(() => {
      if (this.breaktimesek > 0){
        this.breaktimesek--;
        this.breakoutput = this.minuten.toString() + 'm ' + this.breaktimesek.toString() + 'sec';
        this.infoswitch = this.breakoutput;
      }
      else{
        this.breaktimesek = 59;
        this.minuten --;
        this.breakoutput = this.minuten.toString() + 'm ' + this.breaktimesek.toString() + 'sec';
        this.infoswitch = this.breakoutput;
      }
    }, 1000
    )
  }


  timerswith() {
    if (this.firstTime){
      this.infoswitch = this.timerleft.toString();
      this.isrunnig = true;
      this.startTimer();
      clearInterval(this.breakinterval);
      this.firstTime = false;
      this.showmin = !this.showmin;
    }
    else{
      this.showmin = !this.showmin;
      if (this.showmin){
        this.breaktimer();
        this.infoswitch = this.breakoutput;
        this.isrunnig = false;
        clearInterval(this.interval);
    }
      else{
        this.infoswitch = this.timerleft.toString();
        this.isrunnig = true;
        this.startTimer();
        clearInterval(this.breakinterval);
    }
  }
    }

}
