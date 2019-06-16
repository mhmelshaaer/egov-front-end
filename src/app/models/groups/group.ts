import { User } from './../users/user';
import { GroupUser } from './../group-users/group-user';
export class Group{

    public static prev_id = 0;

    // public id: number;

    constructor(
        public id: number,
        public name: String,
        // public members: GroupUser[],
        public new_group: boolean = false,
        public deleted: boolean = false)
    {
        // this.id = ++Group.prev_id;
    }


}