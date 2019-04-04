export class Fee {

    // public static prv_id = 0;
    // public id: number;
    // public value: number;

    constructor(
      public id: number,
      public name: string,
      public value: number,
      public new_fee: boolean = false,
      public deleted: boolean = false,
      public updated: boolean = false){}
  }