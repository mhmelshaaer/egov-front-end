export class Document {

    public static prv_id = 0;
    public id:number;
    
    constructor(
      public name: string){
          this.id = ++Document.prv_id;
      }
  }