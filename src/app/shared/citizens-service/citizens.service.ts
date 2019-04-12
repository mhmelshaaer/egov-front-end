import { Citizen } from './../../models/citizen/citizen';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { MOCK_CITIZENS } from 'src/app/models/citizen/citizens-mockup';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CitizensService {

  private webservice: String = "http://localhost:8000/api/";

  constructor(private http: Http) { }

  getCitizens(): Observable<Citizen[]>{ 
    return this.http.get(this.webservice+'citizens/get').pipe(
      map(res=>res.json()[1].map( (item: any)=>{
        return new Citizen(item.id, item.citizen_name, item.citizen_national_id)
      })
    )
    );
  }

}
