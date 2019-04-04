import { User } from './../users/user';
export class Group{

    public static prev_id = 0;

    public id: number;

    constructor(
        public name: String,
        public members: User[])
    {
        this.id = ++Group.prev_id;
    }


}