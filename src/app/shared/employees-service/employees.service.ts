import { Citizen } from './../../models/citizen/citizen';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Employee } from 'src/app/models/employees/employee';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Department } from 'src/app/models/departments/department';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private webservice: String = "http://localhost:8000/api/";

  constructor(private http: Http) { }

  saveEmployees(citizens: Citizen[], employees: Employee[]){

    return this.http.post(this.webservice+'employees/fetch',{data: {citizens: citizens, employees: employees}});

  }

  getEmployees(): Observable<Employee[]>{
    return this.http.get(this.webservice+'employees/get').pipe(
      map(res=>res.json().map( (item: any)=>{
        let newEmployee= new Employee(item.employee.employee_name,
                                      new Citizen(item.citizen.id,
                                                  item.citizen.citizen_name,
                                                  item.citizen.citizen_national_id),
                                      new Department(item.department.department_name));
        
        newEmployee.id = item.employee.id;
        return newEmployee;
      })
    )
    );
  }

}
