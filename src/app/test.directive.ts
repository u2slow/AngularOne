import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTest]'
})
export class TestDirective {

  constructor(ele: ElementRef) {
    ele.nativeElement.style.backColor = 'red';
   }

}
