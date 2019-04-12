import { Department } from './../departments/department';
import { Citizen } from './../citizen/citizen';
export class Employee{

    private static prev_id = 0;
    
    public id: number;

    constructor(
        public name: String,
        public citizen: Citizen,
        public department: Department
    ){
        this.id = ++Employee.prev_id;
    }
}