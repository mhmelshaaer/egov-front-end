export class Fee {

    public static prv_id = 0;
    public id: number;
    public value: number;
    constructor(
      public name: string){
          this.id = ++Fee.prv_id;
          this.value = this.id;
      }
  }