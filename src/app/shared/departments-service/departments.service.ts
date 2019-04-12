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
  }

}
