import { AddressItemInstance } from '../address-items-instances/AddressItemInstance';

export class AddressStructure{

    constructor(
        public id: number,
        public accumulated_code: string,
        public accumulated_address: string,
        public parent: AddressStructure = null,
        public address_item_instance: AddressItemInstance,
        public new_address_structure: boolean = false,
        public deleted: boolean = false
    ){}

}
