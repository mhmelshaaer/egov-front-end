import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'initial-fees-procurement',
  templateUrl: './initial-fees-procurement.component.html',
  styleUrls: ['./initial-fees-procurement.component.scss']
})
export class InitialFeesProcurementComponent implements OnInit {

  @Input() step: string;

  constructor() { }

  ngOnInit() {
  }


  initialFeesAdd(){
    console.log("initial fees procurement");
  }

  feesAdd(){
    console.log("fees procurement");
  }

}
