import { TransactionsComponent } from './../../transactions/transactions.component';
import { Directive, Input, ElementRef, ContentChild } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[selectControl]'
})
export class SelectControlDirective {

  @Input() set selectControl( condition : boolean ) {
    
    //if the order is selected, check this radio button, else unckeck this radio button
    // condition? this.el.nativeElement.click(): this.el.nativeElement.checked = false;
    condition? this.el.nativeElement.checked=true: this.el.nativeElement.checked = false;

  }

  constructor( private el : ElementRef ) { }

}
