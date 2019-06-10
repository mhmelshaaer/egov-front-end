import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'initial-fees',
  templateUrl: './initial-fees.component.html',
  styleUrls: ['./initial-fees.component.scss']
})
export class InitialFeesComponent implements OnInit {

  @Input() step: string;

  constructor() {}

  ngOnInit() {
  }

  initialFeesAdd(){
    console.log("initial fees");
  }

  feesAdd(){
    console.log("fees");
  }

}
