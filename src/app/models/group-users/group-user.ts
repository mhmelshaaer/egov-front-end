import { Group } from '../groups/group';

export class GroupUser{

    public static prev_id = 0;

    // public id: number;

    constructor(
        public id: number,
        public name: String,
        public group: String,
        public new_group_user: boolean = false,
        public deleted: boolean = false){
            // this.id = ++GroupUser.prev_id;
        }
}