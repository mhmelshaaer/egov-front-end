export class Department{

    public static prv_id = 0;
    public id:number;
    
    constructor(
      public name: string){
          this.id = ++Department.prv_id;
      }

}