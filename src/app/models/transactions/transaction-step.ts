import { Form } from './../forms/form';
import { Group } from '../groups/group';


export class TransactionStep{

    public static prev_id: number = 0;

    public id:number;

    constructor(
        public transaction_id: number = null,
        public form: Form = null,
        // public groups: Group[] = [],
        public order: number = null
    ){
        this.id = ++TransactionStep.prev_id;
    }

}