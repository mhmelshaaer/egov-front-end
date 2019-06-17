export class Document {

    // public static prv_id = 0;
    // public id:number;
    
    constructor(
      public id:number,
      public name: string,
      public mandatory: boolean = false,
      public new_document: boolean = false,
      public deleted: boolean = false){
        //   this.id = ++Document.prv_id;
      }
  }