export class InstanceAttachment{

    constructor(
        public id: number = null,
        public document: Document,
        public received: boolean = false,
        public mandatory: boolean = false
    ){}
}