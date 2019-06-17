import { TransactionStep } from './transaction-step';
import { Fee } from './../fees/fee';
import { Document } from './../documents/document';
import { Form } from './../forms/form';


export class Transaction{

    private static prev_id: number = 0;

    public id:number;

    constructor(
        public name: string,
        public parent: string,
        public steps: TransactionStep[],
        public documents: Document[],
        public fees: Fee[]
    ){}

}