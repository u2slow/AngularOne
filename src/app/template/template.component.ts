import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  loginForm = new FormGroup({
    name: new FormGroup({
      vorname: new FormControl(null, TemplateComponent.myValitator),
      nachname: new FormControl()
    }),
    pass: new FormControl()
  });
  static myValitator (control : FormControl): {[key: string]: any } {
    if (control.value == 'ABC'){
      return {name: {valid: false}};
    }
    else{
      return null;
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

  login(){
    console.log(this.loginForm);
  }

}
