import { Module } from './../modules/Module';
import { Form } from './../forms/form';
import { Group } from '../groups/group';

export class Privilege{

    public static prev_id = 0;

    // public id: number;

    constructor(
        public id: number,
        public name: string,
        public module: Module,
        public form: Form,
        public group: Group,
        public insert_operations: boolean = false,
        public update_operations: boolean = false,
        public delete_operations: boolean = false,
        public new_privilege: boolean = false,
        public deleted: boolean = false
    ){}

}