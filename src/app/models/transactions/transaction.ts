import { Fee } from './../fees/fee';
import { Document } from './../documents/document';
import { Form } from './../forms/form';


export class Transaction{

    private static prev_id: number = 0;

    public id:number;

    constructor(
        public steps: number[],
        public documents: number[],
        public fees: number[]
    ){}

}