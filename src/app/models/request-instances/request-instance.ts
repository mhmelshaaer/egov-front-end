import { Citizen } from './../citizen/citizen';
import { AddressStructure } from './../address-structures/AddressStructure';
import { Request } from './../requests/request';


export class RequestInstance{


    constructor(
        public id:number,
        public request: Request,
        public structure: AddressStructure,
        public customer: Citizen,
        public new_request_instance: boolean = false,
        public deleted: boolean = false){}

}