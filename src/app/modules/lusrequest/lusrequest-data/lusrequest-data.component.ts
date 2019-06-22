import { EngineersService } from './../../../shared/engineers-service/engineers.service';
import { EngineeringOfficesService } from './../../../shared/engineering-offices-service/engineering-offices.service';
import { LandsService } from './../../../shared/lands-service/lands.service';
import { Component, OnInit } from '@angular/core';

import { Engineer } from './../../../models/engineers/engineer';
import { EngineeringOffice } from './../../../models/engineering-offices/engineering-office';
import { LusDecision } from './../../../models/lus-decisions/lus-decision';
import { ValidityCertificate } from './../../../models/validity-certificates/validity-certificate';

@Component({
  selector: 'app-lusrequest-data',
  templateUrl: './lusrequest-data.component.html',
  styleUrls: ['./lusrequest-data.component.scss']
})
export class LUSRequestDataComponent implements OnInit {


  validityCertificates: ValidityCertificate[];
  lusDecision: LusDecision[];
  engineeringOffices: EngineeringOffice[];
  engineers: Engineer[];

  currEngineeringOffice: EngineeringOffice;
  currEngineer: Engineer;

  engineeringOfficesConfig: any;
  engineersConfig: any;

  constructor(private landsService:LandsService,
              private engineeringOfficesService:EngineeringOfficesService,
              private engineersService:EngineersService) { }

  ngOnInit() {

    this.engineeringOffices = [];
    this.engineers = [];

    this.currEngineeringOffice = null;
    this.currEngineer = null;

    this.engineeringOfficesConfig = {
      displayKey:"name", //if objects array passed which key to be displayed defaults to description
      search:true, //true/false for the search functionlity defaults to false
      height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
      placeholder:'المكتب الهندسى', // text to be displayed when no item is selected defaults to Select
      customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
      limitTo: 10, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
      moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
      noResultsFound: 'لا يوجد', // text to be displayed when no items are found while searching
      searchPlaceholder:'بحث', // label thats displayed in search input,
      searchOnKey: 'name', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    }
    this.engineersConfig = {
      displayKey:"name", //if objects array passed which key to be displayed defaults to description
      search:true, //true/false for the search functionlity defaults to false
      height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
      placeholder:'المهندس الإستشارى', // text to be displayed when no item is selected defaults to Select
      customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
      limitTo: 10, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
      moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
      noResultsFound: 'لا يوجد', // text to be displayed when no items are found while searching
      searchPlaceholder:'بحث', // label thats displayed in search input,
      searchOnKey: 'name', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    }

  }

}
