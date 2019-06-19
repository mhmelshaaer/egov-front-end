import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AddressStructure } from './../../models/address-structures/AddressStructure';
import { AddressItemInstance } from '../../models/address-items-instances/AddressItemInstance';
import { AddressItem } from './../../models/address-items/AddressItem';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  private webservice: String = "http://localhost:8000/api/";

  constructor(private http: Http) { }

  saveAddressItems(addressItems: AddressItem[]){
    console.log("saving new AddressItem...");

    return this.http.post(this.webservice+'address-items/fetch',{data: addressItems});
  }

  saveAddressItemsInstances(addressItemsInstances: AddressItemInstance[]){
    console.log("saving new addressItemsInstances...");

    return this.http.post(this.webservice+'address-items-instances/fetch',{data: addressItemsInstances});
  }

  saveAddressStructures(addressStructures: AddressStructure[]){
    console.log("saving new addressStructures...");

    return this.http.post(this.webservice+'address-structures/fetch',{data: addressStructures});
  }

  getAddressItems(): Observable<AddressItem[]>{
    return this.http.get(this.webservice+'address-items/get').pipe(
      map(res=>res.json().address_items.map( (item: any)=>{
          return new AddressItem(item.id, item.name, item.code, item.digit);
      }))
    )
  }

  getAddressItemsInstances(): Observable<AddressItemInstance[]>{
    return this.http.get(this.webservice+'address-items-instances/get').pipe(
      map(res => {return res.json().address_items_instances;})
    )
  }

  getAddressStructures(): Observable<AddressStructure[]>{
    return this.http.get(this.webservice+'address-structures/get').pipe(
      map(res => {return res.json().address_structures}
      )
    )
  }

}
