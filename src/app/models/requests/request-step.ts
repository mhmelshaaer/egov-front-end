import { Form } from '../forms/form';
import { Group } from '../groups/group';


export class RequestStep{


    constructor(
        public id:number,
        public request_id: number = null,
        public form: Form = null,
        public order: number = null,
        public new_request_step: boolean = false,
        public deleted: boolean = false,
        public updated: boolean = false
    ){}

}