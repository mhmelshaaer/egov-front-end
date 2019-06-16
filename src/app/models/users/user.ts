import { Employee } from '../employees/employee';
import { Role } from '../roles/role';

export class User{

    public static prev_id = 0;

    // public id: number;

    constructor(
        public id: number,
        public username: String,
        public password: String,
        // public groups: String[] = [],
        public role: Role=null,
        public employee: Employee=null
        ){
            // this.id = ++User.prev_id;
        }
}