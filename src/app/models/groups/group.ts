import { GroupUser } from './../group-users/group-user';
export class Group{

    public static prev_id = 0;

    public id: number;

    constructor(
        public name: String,
        public members: GroupUser[])
    {
        this.id = ++Group.prev_id;
    }


}