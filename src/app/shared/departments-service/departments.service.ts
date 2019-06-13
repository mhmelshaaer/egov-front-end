import { Http } from '@angular/http';
import { MOCK_DEPARTMENTS } from 'src/app/models/departments/departments-mockup';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  private webservice: String = "http://localhost:8000/api/";

  constructor(private http: Http) { }

  getDepartments(){
    return MOCK_DEPARTMENTS;

    // return this.http.get(this.webservice+'employees/get').pipe(
    //   map(res=>res.json().map( (item: any)=>{
    //     let newEmployee= new Employee(item.employee.employee_name,
    //                                   new Citizen(item.citizen.id,
    //                                               item.citizen.citizen_name,
    //                                               item.citizen.citizen_national_id),
    //                                   new Department(item.department.department_name));
        
    //     newEmployee.id = item.employee.id;
    //     return newEmployee;
    //   })
    // )
    // );

  }

}
