export class Role{

    public static prev_id = 0;

    public id: number;

    constructor(
        public name: String
    ){
        this.id = ++Role.prev_id;
    }

}