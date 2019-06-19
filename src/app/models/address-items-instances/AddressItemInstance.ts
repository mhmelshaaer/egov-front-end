import { AddressItem } from '../address-items/AddressItem';

export class AddressItemInstance{

    constructor(
        public id: number,
        public name: string,
        public address_item: AddressItem,
        public new_address_item_instance: boolean = false,
        public deleted: boolean = false
    ){}

}
