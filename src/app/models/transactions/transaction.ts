import { Lus } from './../lus/lus';
import { Citizen } from './../citizen/citizen';
import { RequestInstance } from '../request-instances/request-instance';

export class Transaction{

    constructor(
        public id: number,
        public request_instance: RequestInstance,
        public agency: Citizen,
        public lus: Lus,
        public new_transaction: boolean = false,
        public deleted: boolean = false
    ){}
}