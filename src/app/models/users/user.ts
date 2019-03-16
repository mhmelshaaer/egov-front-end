export class User{

    public static prev_id = 0;

    public id: number;

    constructor(
        public name: String,
        public group_name: String,
        public role: String,
        public privileges: String[]){
            this.id = ++User.prev_id;
        }
}