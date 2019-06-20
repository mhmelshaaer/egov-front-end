import { Component, OnInit } from '@angular/core';

import { AddressesService } from './../../../shared/addresses-service/addresses.service';

import { AddressStructure } from './../../../models/address-structures/AddressStructure';
import { AddressItemInstance } from './../../../models/address-items-instances/AddressItemInstance';
import { AddressItem } from './../../../models/address-items/AddressItem';

import {
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-address-structures',
  templateUrl: './address-structures.component.html',
  styleUrls: ['./address-structures.component.scss']
})
export class AddressStructuresComponent implements OnInit {

  //Fontawesome icons
  faTrashAlt = faTrashAlt;

  addressItems: AddressItem[];
  addressItemsInstances: AddressItemInstance[];
  addressStructures: AddressStructure[];

  currAddressStructure: AddressItemInstance;
  currAddressStructureParent: AddressStructure;

  newAddressItem: AddressItem;
  newAddressItemInstance: AddressItemInstance;
  newAddressStructure: AddressStructure;

  addressItemInstancesConfig: any;
  addressItemInstanceParentConfig: any;

  constructor(private addressesService:AddressesService) { }

  ngOnInit() {

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

    this.currAddressStructure = null;
    this.currAddressStructureParent = null;

    this.newAddressItem = new AddressItem(null, "", "", null);
    this.newAddressItemInstance = new AddressItemInstance(null, "", null);
    this.newAddressStructure = new AddressStructure(null, "", "", null,
                                                    new AddressItemInstance(null, "",
                                                                            new AddressItem(null, "", "", 0)));

    this.addressItemInstancesConfig = {
      displayKey:"name", //if objects array passed which key to be displayed defaults to description
      search:true, //true/false for the search functionlity defaults to false
      height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
      placeholder:'الوحدة', // text to be displayed when no item is selected defaults to Select
      customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
      limitTo: 10, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
      moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
      noResultsFound: 'Can\'t find an address with this name', // text to be displayed when no items are found while searching
      searchPlaceholder:'بحث', // label thats displayed in search input,
      searchOnKey: 'name', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    }

    this.addressItemInstanceParentConfig = {
      displayKey:"accumulated_address", //if objects array passed which key to be displayed defaults to description
      search:true, //true/false for the search functionlity defaults to false
      height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
      placeholder:'الوحدة', // text to be displayed when no item is selected defaults to Select
      customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
      limitTo: 10, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
      moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
      noResultsFound: 'Can\'t find an address with this name', // text to be displayed when no items are found while searching
      searchPlaceholder:'بحث', // label thats displayed in search input,
      searchOnKey: 'name', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    }

  }

  ngOnDestroy(){
    this.addressesService.saveAddressItems(this.addressItems).subscribe();
    this.addressesService.saveAddressItemsInstances(this.addressItemsInstances).subscribe();
    this.addressesService.saveAddressStructures(this.addressStructures).subscribe();
  }

  saveChanges(){
    this.addressesService.saveAddressItems(this.addressItems).subscribe(()=>{
      this.addressesService.getAddressItems().subscribe(data=>this.addressItems=data);
    });

    this.addressesService.saveAddressItemsInstances(this.addressItemsInstances).subscribe(()=>{
      this.addressesService.getAddressItemsInstances().subscribe(
        data => {
  
          this.addressItemsInstances = [];
  
          data.map(
            (item: any)=>{
              let addressItem = this.addressItems.find(x => x.id == item.address_item_id);
              let newAddressItemInstance = new AddressItemInstance( item.id, item.name, addressItem);
              this.addressItemsInstances.push(newAddressItemInstance);
            }
          )
          console.log(this.addressItemsInstances);
        }
      );
    });

    this.addressesService.saveAddressStructures(this.addressStructures).subscribe(()=>{
      this.addressesService.getAddressStructures().subscribe(
        data => {
  
          this.addressStructures = [];
  
          data.map(
            (item: any)=>{
              let parent = data.find(x => x.id == item.parent_id);
              !parent? parent=null: null;
              let itemInstance = this.addressItemsInstances.find(x => x.id == item.address_item_instance_id);
              let newAddressStructure = new AddressStructure( item.id, item.acc_code, item.acc_address, parent, itemInstance);
              this.addressStructures.push(newAddressStructure);
            }
          )
          console.log(this.addressStructures);
        }
      );
    });
  }

  addAddressItem(){
    if(this.newAddressItem.name != ""){
      this.newAddressItem.new_address_item = true;
      this.addressItems.push(this.newAddressItem);
      this.newAddressItem = new AddressItem(null, "", "", null);
    }else{
      console.log('fuck you');
    }
  }

  deleteAddressItem(index: number){
    
    let currAddressItem = this.addressItems[index];

    if(!currAddressItem.id){
      this.addressItems.splice(index, 1);
    }else{
      currAddressItem.deleted = true;
    }
    
  }

  addAddressItemInstnace(){

    let addressItem = this.newAddressItemInstance.address_item;

    let existAddressItemInstance = this.addressItemsInstances.find(x => x.name == this.newAddressItemInstance.name);

    if(!existAddressItemInstance){
      console.log(existAddressItemInstance);
      let addressItemInstance = new AddressItemInstance(null, this.newAddressItemInstance.name, addressItem, true);
      this.addressItemsInstances.push(addressItemInstance);
    }

    this.newAddressItemInstance = new AddressItemInstance(null, "", null);
    console.log(this.addressItemsInstances);
  }

  deleteAddressItemInstance(index: number){

    let currAddressItemInstnace = this.addressItemsInstances[index];

    if(!currAddressItemInstnace.id){
      this.addressItemsInstances.splice(index, 1);
    }else{
      currAddressItemInstnace.deleted = true;
    }
   
    console.log(this.addressItemsInstances);
  }

  addAddressStructure(){

    console.log(this.currAddressStructure);
    console.log(this.currAddressStructureParent);

    let accumulatedAddressLength = this.newAddressStructure.accumulated_address.length;

    if(this.currAddressStructureParent){
      this.newAddressStructure.accumulated_code += this.currAddressStructureParent.accumulated_code;
      this.newAddressStructure.accumulated_address += accumulatedAddressLength>0?
                                                        "-" + this.currAddressStructureParent.accumulated_address:
                                                        this.currAddressStructureParent.accumulated_address;
      this.newAddressStructure.parent = this.currAddressStructureParent;
    }

    accumulatedAddressLength = this.newAddressStructure.accumulated_address.length;

    this.newAddressStructure.accumulated_code += this.currAddressStructure.address_item.code;
    this.newAddressStructure.accumulated_address +=  accumulatedAddressLength>0?
                                                      "-" + this.currAddressStructure.name:
                                                      this.currAddressStructure.name;
    this.newAddressStructure.parent = this.currAddressStructureParent;
    this.newAddressStructure.address_item_instance = this.currAddressStructure;
    this.newAddressStructure.new_address_structure = true;

    this.addressStructures = this.addressStructures.concat(this.newAddressStructure);


    console.log(this.newAddressStructure);

    this.newAddressStructure = new AddressStructure(null, "", "", null,
                                                    new AddressItemInstance(null, "",
                                                                            new AddressItem(null, "", "", 0)));

  }

  deleteAddressStructure(index: number){
    let currAddressStructure = this.addressStructures[index];

    if(!currAddressStructure.id){
      this.addressStructures.splice(index, 1);
      this.addressStructures = Object.assign([], this.addressStructures);
    }else{
      currAddressStructure.deleted = true;
    }
   
    console.log(this.addressStructures);
  }

}
