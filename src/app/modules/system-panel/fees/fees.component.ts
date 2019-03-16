import { Component, OnInit } from '@angular/core';

import { Fee } from './../../../models/fees/fee';

import { MOCK_FEES } from 'src/app/models/fees/fees-mockup';

import {
  faTrashAlt,
  faEdit,
  faSave
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.scss']
})
export class FeesComponent implements OnInit {

  //Fontawesome icons
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  faSave = faSave;

  fees: Fee[];
  feeControls: FeeControl[];
  newFee: Fee;

  constructor() { }

  ngOnInit() {
    this.fees = MOCK_FEES;
    this.feeControls = [];
    this.newFee = new Fee("");

    this.fees.forEach(function(fee){
      this.push(new FeeControl(fee));
    },this.feeControls);

  }

  add(){
    if(this.newFee.name != "" && this.newFee.value != null){
      this.feeControls.push(new FeeControl(this.newFee));
      this.newFee = new Fee("");
    }else{
      console.log('fuck you');
    }
  }

  delete(index){
    this.feeControls.splice(index, 1);
  }

  enableEdit(curr_fee: FeeControl){
    curr_fee.disableInput = !curr_fee.disableInput;
    curr_fee.disableEdit = !curr_fee.disableEdit;
    if(curr_fee.disableEdit){
      curr_fee.diplayEdit = 'none';
      curr_fee.diplaySave = 'inline';
    }else{
      curr_fee.diplayEdit = 'inline';
      curr_fee.diplaySave = 'none';
    }
  }
  saveEdit(curr_fee: FeeControl){
    this.enableEdit(curr_fee);
  }
}

class FeeControl{

  constructor(
    public fee: Fee,
    public disableInput: boolean = true,
    public disableEdit: boolean = false,
    public diplayEdit: String = 'inline',
    public diplaySave: String = 'none'
  ){}

}
