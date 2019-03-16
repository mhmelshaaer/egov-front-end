import { Directive, Input, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';



@Directive({
  selector: '[disableControl]'
})
export class DisableControlDirective {

  @Input() set disableControl( condition : boolean ) {
    const action = condition ? 'disable' : 'enable';
    this.ngControl.control[action]();
  }

  constructor( private ngControl : NgControl ) {   
  }

  /**
   * Another way of doing it
   */
  // @Input()
  // set disableControl( control : boolean ) {
  //   this.el.nativeElement.disabled = control;
  // }

  // constructor( private el : ElementRef ) {
  // }

}
