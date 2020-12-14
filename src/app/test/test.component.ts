import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor() { }
  originalPras = ['42','32','33','32','green','33'];
  ngOnInit(): void {
  }
  rotate(){
    console.log(this.originalPras);
    for (let i = 0; i < 4; i++){
      const x = Number(this.originalPras[i][1]);
      const y = Number(this.originalPras[i][0]);
      const offset_x = Number(this.originalPras[5][1]);
      const offset_y = Number(this.originalPras[5][0]);
      const adjusted_x = x - offset_x;
      const adjusted_y = y - offset_y;
      console.log(adjusted_x);
      console.log(adjusted_y);
      const cos_rad = 0;
      const sin_rad = 1;
      const qx = offset_x + cos_rad * adjusted_x + sin_rad * adjusted_y;
      const qy = offset_y + -sin_rad * adjusted_x + cos_rad * adjusted_y;
      console.log(qy);
      console.log(qx);
      this.originalPras[i] = String(qy) + String(qx);
    }
    //this.editparas();
    console.log(this.originalPras);
  }
  style(id){
    console.log(id[0],id[2]);
  }
}
