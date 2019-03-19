import { Group } from '../groups/group';

export class Form{
    private static prev_id:number = 0

    public id: number;

    constructor(
        public name: String,
    ){
        this.id = ++Form.prev_id;
    }

}