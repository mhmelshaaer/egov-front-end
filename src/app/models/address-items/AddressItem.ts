
export class AddressItem{

    constructor(
        public id: number,
        public name: string,
        public code: string,
        public digit: number,
        public new_address_item: boolean = false,
        public deleted: boolean = false
    ){}

}
