import { RequestInstance } from './../../../models/request-instances/request-instance';
import { LandsService } from './../../../shared/lands-service/lands.service';
import { Lus } from './../../../models/lus/lus';
import { TransactionsService } from './../../../shared/transactions-service/transactions.service';
import { AddressStructure } from './../../../models/address-structures/AddressStructure';
import { AddressItemInstance } from './../../../models/address-items-instances/AddressItemInstance';
import { AddressItem } from './../../../models/address-items/AddressItem';
import { AddressesService } from './../../../shared/addresses-service/addresses.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CitizensService } from './../../../shared/citizens-service/citizens.service';
import { Citizen } from './../../../models/citizen/citizen';
import { Request } from 'src/app/models/requests/request';
import { Transaction } from 'src/app/models/transactions/transaction';

@Component({
  selector: 'app-lusrequest-meta-data',
  templateUrl: './lusrequest-meta-data.component.html',
  styleUrls: ['./lusrequest-meta-data.component.scss']
})
export class LUSRequestMetaDataComponent implements OnInit {

  citizens: Citizen[];
  allCitizenLus: Lus[];
  allCitizenStructures: AddressStructure[];
  allCitizenUnits: Lus[];

  addressItems: AddressItem[];
  addressItemsInstances: AddressItemInstance[];
  addressStructures: AddressStructure[];

  currConcernedPerson: Citizen;
  currBondAgency: Citizen;
  currCitizenLus: Lus;
  currAddressSelection: AddressStructure;
  currLusSelection: Lus;

  requestType: string;
  unitType: string;
  unitNumber: string;
  
  newRequestInstance: RequestInstance;
  newTransaction: Transaction;

  concernedPersonConfig: any;
  bondAgencyConfig: any;
  addressSelectionConfig: any;

  constructor(private router: Router,
              private citizensService: CitizensService,
              private addressesService:AddressesService,
              private transactionsService:TransactionsService,
              private landsService:LandsService) { }

  ngOnInit() {

    this.requestType = this.transactionsService.defaultRequestType;
    console.log(this.requestType);
    this.citizensService.getCitizens().subscribe(data=>{this.citizens=data});

    this.addressesService.getAll().subscribe(responseList => {

      let rawAddressItems = responseList[0];
      let rawAddressItemsInstances = responseList[1];
      let rawAddressStructures = responseList[2];

      this.addressItems = rawAddressItems;

      this.addressItemsInstances = [];
      rawAddressItemsInstances.map(
          (item: any)=>{
            let addressItem = this.addressItems.find(x => x.id == item.address_item_id);
            let newAddressItemInstance = new AddressItemInstance( item.id, item.name, addressItem);
            this.addressItemsInstances.push(newAddressItemInstance);
          }
      )

      this.addressStructures = [];
      rawAddressStructures.map(
        (item: any)=>{
          let parent = rawAddressStructures.find(x => x.id == item.parent_id);
          !parent? parent=null: null;
          let itemInstance = this.addressItemsInstances.find(x => x.id == item.address_item_instance_id);
          let newAddressStructure = new AddressStructure( item.id, item.acc_code, item.acc_address, parent, itemInstance);
          this.addressStructures.push(newAddressStructure);
        }
      )

    });

    this.currConcernedPerson = null;
    this.currBondAgency = null;
    this.currCitizenLus = null;
    this.currAddressSelection = null;
    this.currLusSelection = null;

    // this.requestType = "طلب ترخيص أعمال بناء";

    this.newRequestInstance = new RequestInstance(null,new Request(null, this.requestType, null, null, null, null),null,null);
    this.newTransaction = new Transaction(null, null, null, null);

    this.concernedPersonConfig = {
      displayKey:"name", //if objects array passed which key to be displayed defaults to description
      search:true, //true/false for the search functionlity defaults to false
      height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
      placeholder:'صاحب الشأن', // text to be displayed when no item is selected defaults to Select
      customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case
      limitTo: 10, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
      moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
      noResultsFound: 'Can\'t find a citizen with this national id, You can add new citizen below', // text to be displayed when no items are found while searching
      searchPlaceholder:'بحث', // label thats displayed in search input,
      searchOnKey: 'name', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    }

    this.bondAgencyConfig = {
      displayKey:"name", //if objects array passed which key to be displayed defaults to description
      search:true, //true/false for the search functionlity defaults to false
      height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
      placeholder:'الوكيل', // text to be displayed when no item is selected defaults to Select
      customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case
      limitTo: 10, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
      moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
      noResultsFound: 'Can\'t find a citizen with this national id, You can add new citizen below', // text to be displayed when no items are found while searching
      searchPlaceholder:'بحث', // label thats displayed in search input,
      searchOnKey: 'name', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    }

    this.addressSelectionConfig = {
      displayKey:"accumulated_address", //if objects array passed which key to be displayed defaults to description
      search:true, //true/false for the search functionlity defaults to false
      height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
      placeholder:'التنظيم', // text to be displayed when no item is selected defaults to Select
      customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case
      limitTo: 10, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
      moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
      noResultsFound: 'Can\'t find an address', // text to be displayed when no items are found while searching
      searchPlaceholder:'بحث', // label thats displayed in search input,
      searchOnKey: 'accumulated_address', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    }
  }

  getAllCitizenLus(){
    this.allCitizenUnits = [];
    this.currConcernedPerson?
      this.landsService.getAllCitizenLus(""+this.currConcernedPerson.id).subscribe(data =>{
        this.allCitizenLus = data;
        this.allCitizenStructures = [];
        data.map(lus => {this.allCitizenStructures.push(lus.structure)})
      })
      :null;
  }

  getAllCitizenUnits(){
    this.allCitizenUnits = [];
    this.currAddressSelection?
      this.landsService.getAllCitizenUnits(""+this.currConcernedPerson.id, ""+this.currAddressSelection.id)
          .subscribe(data =>{
            this.allCitizenUnits = data;
          })
      :null;
  }

  goBack(){
    this.router.navigate(['/panel-home/requests-add']);
  }

  addTransaction(){
    this.newRequestInstance.customer = this.currConcernedPerson;
    this.newRequestInstance.structure = this.currAddressSelection;
    this.newTransaction.agency = this.currBondAgency;
    this.newTransaction.lus = this.currLusSelection;

    console.log(this.newRequestInstance);
    console.log(this.newTransaction);

    this.transactionsService.saveRequestInstance(this.newRequestInstance).subscribe(
      response1 => {
        let rawRequestInstance: RequestInstance = response1.json().request_instance;
        this.transactionsService.saveTransaction(""+rawRequestInstance.id, this.newTransaction).subscribe(
          response2 => {
            let rawTransacion = response2.json().transaction;
            this.transactionsService.saveLicense(""+rawRequestInstance.id, ""+rawTransacion.id, ""+this.currLusSelection.id).subscribe(
              response3 => {
                let rawLicense = response3.json().license;
                this.transactionsService.saveBuildingLicense(""+rawLicense.id).subscribe(
                  respose4 => {
                    
                    this.goBack();
                  }
                )
              }
            )
          }
        )
      }
    );
  }

}
