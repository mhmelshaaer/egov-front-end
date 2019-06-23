import { Citizen } from 'src/app/models/citizen/citizen';
import { Lus } from '../lus/lus';

export class ValidityCertificate{

    constructor(
        public id: number = null,
        public certificate_number: string,
        public lus: Lus,
        public citizen: Citizen,
    ){}

}