import { AddressStructure } from './../address-structures/AddressStructure';
export class Lus{

    constructor(
        public id: number = null,
        public structure: AddressStructure,
        public area: number,
        public serial: number,
    ){}

}