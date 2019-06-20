import { RequestStep } from './request-step';
import { Fee } from '../fees/fee';
import { Document } from '../documents/document';


export class Request{

    private static prev_id: number = 0;

    public id:number;

    constructor(
        public name: string,
        public parent: string,
        public steps: RequestStep[],
        public documents: Document[],
        public fees: Fee[]
    ){}

}