import { Component, OnInit } from '@angular/core';

import { FormsService } from './../../../shared/forms-service/forms.service';

import { Form } from './../../../models/forms/form';

import {
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

  //Fontawesome icons
  faTrashAlt = faTrashAlt;

  forms:Form[]
  newForm: Form;

  constructor(private formsService: FormsService) { }

  ngOnInit() {

    this.formsService.getForms().subscribe(data=> this.forms=data);
    this.newForm = new Form(null, "");
    console.log(this.forms);

  }


  ngOnDestroy(){
    
    this.formsService.updateForms(this.forms).subscribe();
  }
  
  add(){
    if(this.newForm.name != ""){
      this.newForm.new_form = true;
      this.forms.push(this.newForm);
      this.newForm = new Form(null, "");
    }else{
      console.log('fuck you');
    }
  }

  delete(index: number){

    if(this.forms[index].new_form){
      this.forms.splice(index, 1);
    }else{
      this.forms[index].deleted = true;
    }
    
  }


}
