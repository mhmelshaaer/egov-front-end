import { map } from 'rxjs/operators';
import { Engineer } from './../../models/engineers/engineer';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EngineersService {

  private webservice: String = "http://localhost:8000/api/";

  constructor(private http: Http) { }

  getEngineers(): Observable<Engineer[]>{
    return this.http.get(this.webservice+'engineers/get').pipe(
      map(res => {
        let engineers: Engineer[] = [];
        res.json().engineers.map( (item: any) => {
          engineers.push(new Engineer(item.id,
                                                item.name,
                                                item.register_number));
        })
        return engineers;
      })
    )
  }
}
