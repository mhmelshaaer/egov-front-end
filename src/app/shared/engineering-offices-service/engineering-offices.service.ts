import { Engineer } from './../../models/engineers/engineer';
import { map } from 'rxjs/operators';
import { EngineeringOffice } from './../../models/engineering-offices/engineering-office';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EngineeringOfficesService {

  private webservice: String = "http://localhost:8000/api/";

  constructor(private http: Http) { }

  getEngineeringOffices(): Observable<EngineeringOffice[]>{
    return this.http.get(this.webservice+'engineering-offices/get').pipe(
      map(res => {
        let engineeringOffices: EngineeringOffice[] = [];
        res.json().engineering_offices.map( (item: any) => {
          engineeringOffices.push(new EngineeringOffice(item.id,
                                                        item.name,
                                                        item.syndicate_reg_number,
                                                        item.tax_card,
                                                        item.commercial_register));
        })
        return engineeringOffices;
      })
    )
  }

}
