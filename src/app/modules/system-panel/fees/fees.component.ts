import { FeesService } from './../../../shared/fees-service/fees.service';
//Core
import { Component, OnInit } from '@angular/core';

//Models
import { Fee } from './../../../models/fees/fee';

//Mockups
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

  //Fees business logic variables
  fees: Fee[]; //array of all fees retrieved from web service
  feeControls: FeeControl[]; //the modified version of fees arrat
  newFee: Fee; //the newly added fee temporary holder

  constructor(private feesService: FeesService) { }

  ngOnInit() {
    this.fees = this.feesService.getFees();
    this.feeControls = [];
    this.newFee = new Fee("");

    //Wrapping the each Fee object in fees array in a FeeControl Object to
    //add other attributes that control the Fee object in the view
    this.fees.forEach(function(fee){
      this.push(new FeeControl(fee));
    },this.feeControls);

  }

  ngOnDestroy(){
    let modified_fees = [];
    this.feeControls.forEach(feeControl =>  modified_fees.push(feeControl.fee));
    this.feesService.saveFees(this.fees,  modified_fees);
  }

  add(){
    if(this.newFee.name != "" && this.newFee.value != null){
      this.feeControls.push(new FeeControl(this.newFee));
      this.newFee = new Fee("");
    }else{
      console.log('fuck you');
    }
  }

  delete(index: number){
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
