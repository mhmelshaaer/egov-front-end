import { Group } from '../groups/group';

export class Form{
    private static prev_id:number = 0

    // public id: number;

    constructor(
        public id: number,
        public name: String,
        public new_form: boolean = false,
        public deleted: boolean = false
    ){
        // this.id = ++Form.prev_id;
    }

}