
export class Module{

    public static prev_id = 0;

    // public id: number;

    constructor(
        public id: number,
        public name: string,
        public new_module: boolean = false,
        public deleted: boolean = false
    ){}

}