//Core
import { Component, OnInit } from '@angular/core';

//Models
import { Fee } from './../../../models/fees/fee';

//Services
import { FeesService } from './../../../shared/fees-service/fees.service';

//Fontawesome
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
    this.feesService.getFees().subscribe(data=>{
      this.fees=data;
      this.feeControls = [];
      //Wrapping the each Fee object in fees array in a FeeControl Object to
      //add other attributes that control the Fee object in the view
      this.fees.map((fee)=>{
        this.feeControls.push(new FeeControl(Object.assign({}, fee)));
      });
    });
    
    this.newFee = new Fee(null, "", null);
    // console.log()
    let arr1 = [
      new Fee(1, "fee1", 1),
      new Fee(2, "fee2", 2),
      new Fee(3, "fee3", 3)
    ];
    let arr2 = [];

    arr1.map(fee=>arr2.push(Object.assign({}, fee)));
    arr1[1].name = "fee2 edited";
    // arr2[1] = 9;

    console.log(arr1, arr2);
    

  }

  ngOnDestroy(){
    let modified_fees = [];
    this.feeControls.forEach( (feeControl, i) =>{
      if(!feeControl.fee.new_fee && !feeControl.fee.deleted){
        if( feeControl.fee.name != this.fees[i].name || feeControl.fee.value != this.fees[i].value ){
          feeControl.fee.updated = true;
        }
      }
      modified_fees.push(feeControl.fee)
    });
    
    this.feesService.saveFees(modified_fees).subscribe();
  }

  add(){
    if(this.newFee.name != "" && this.newFee.value != null){ 
      this.newFee.new_fee = true;
      this.feeControls.push(new FeeControl(this.newFee));
      this.newFee = new Fee(null, "", null);
    }else{
      console.log('fuck you');
    }
  }

  delete(index: number){

    if(this.feeControls[index].fee.new_fee){
      this.feeControls.splice(index, 1);
    }else{
      this.feeControls[index].fee.deleted = true;
    }

    
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
