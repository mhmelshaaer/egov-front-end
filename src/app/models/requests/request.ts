import { Fee } from '../fees/fee';
import { Document } from '../documents/document';
import { RequestStep } from './request-step';


export class Request{

    private static prev_id: number = 0;

    // public id:number;

    constructor(
        public id:number = null,
        public name: string,
        public parent: string,
        public steps: RequestStep[],
        public documents: Document[],
        public fees: Fee[],
        public new_request: boolean = false,
        public deleted: boolean = false,
        public updated: boolean = false
    ){}

}