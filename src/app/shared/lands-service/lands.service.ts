import { AddressStructure } from './../../models/address-structures/AddressStructure';
import { Lus } from './../../models/lus/lus';
import { map } from 'rxjs/operators';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LusDecision } from './../../models/lus-decisions/lus-decision';
import { ValidityCertificate } from './../../models/validity-certificates/validity-certificate';
import { Citizen } from 'src/app/models/citizen/citizen';

@Injectable({
  providedIn: 'root'
})
export class LandsService {

  private webservice: String = "http://localhost:8000/api/";

  constructor(private http: Http) { }

  getCitizenValidityCertificates(citizen_id: string): Observable<ValidityCertificate[]>{
    return this.http.get(this.webservice+'validity-certificates/get/' + citizen_id).pipe(
      map(res => {

        let validityCertificates: ValidityCertificate[] = [];

        res.json()
            .certificates
            .map( (item: any)=>{
              let rawLus = res.json().all_lus.find(x => x.id == item.LUS_id);
              let rawCitizen = res.json().citizens.find(x => x.id == item.citizen_id);
              validityCertificates.push(new ValidityCertificate(item.id,
                                                                item.certificate_id,
                                                                new Lus(rawLus.id, null, rawLus.Area, rawLus.Serial),
                                                                new Citizen(rawCitizen.id, rawCitizen.citizen_name, rawCitizen.citizen_national_id)));
            })

        return validityCertificates;

      })
    )
  }

  getCitizenValidityCertificate(citizen_id: string, lus_id: string): Observable<ValidityCertificate>{
    return this.http.get(this.webservice+'validity-certificate/get/' + citizen_id + '/' + lus_id).pipe(
      map(res => {
        let rawCertificate = res.json().citizen_certificate  ;  
        let rawLus = res.json().citizen_lus;
        let rawCitizen = res.json().citizen;
        return new ValidityCertificate( rawCertificate.id,
                                        rawCertificate.certificate_number,
                                        new Lus(rawLus.id, null, rawLus.Area, rawLus.Serial),
                                        new Citizen(rawCitizen.id, rawCitizen.citizen_name, rawCitizen.citizen_national_id));



      })
    )
  }

  getCitizenLusDecisions(citizen_id: string): Observable<LusDecision[]>{
    return this.http.get(this.webservice+'lus-decisions/get/' + citizen_id).pipe(
      map(res => {
        let citizenlusDecisions: LusDecision[]=[];
        res.json().citizen_lus_decisions.map( (item: any) => {
          citizenlusDecisions.push(new LusDecision(item.id, item.decision_number, item.decision_date));
        })
        return citizenlusDecisions;
      })
    )
  }

  getCitizenLusDecision(citizen_id: string, lus_id: string): Observable<LusDecision>{
    return this.http.get(this.webservice+'citizen-lus-decision/get/' + citizen_id + '/' + lus_id).pipe(
      map(res => {
        let rawLusDecision = res.json().citizen_lus_decision;
        return new LusDecision(rawLusDecision.id, rawLusDecision.Decision_Number, rawLusDecision.Decision_Date);
      })
    )
  }

  getAllCitizenLus(citizen_id: string): Observable<Lus[]>{
    return this.http.get(this.webservice+'all-citizen-lus/get/' + citizen_id).pipe(
      map(res => {
        
        let allCitizenLus: Lus[] = [];

        res.json()
            .all_citizen_lus
            .map( (item: any)=>{
              let rawAddressStructure = res.json().structures.find(x => x.id == item.Structure_id);
              let newLus = new Lus( item.id,
                                    new AddressStructure(rawAddressStructure.id, rawAddressStructure.acc_code, rawAddressStructure.acc_address, null, null),
                                    item.Area,
                                    item.Serial);

              let result = allCitizenLus.find(x=>x.structure.accumulated_code == newLus.structure.accumulated_code);
              !result? allCitizenLus.push(newLus): null;
            })

          return allCitizenLus;
        }
      )
    )
  }

  getAllCitizenUnits(citizen_id: string, structure_id:string): Observable<Lus[]>{
    return this.http.get(this.webservice+'all-citizen-units/get/' + citizen_id + '/' + structure_id).pipe(
      map(res => {
        
        let allCitizenUnits: Lus[] = [];

        res.json()
            .all_citizen_units
            .map( (item: any)=>{
              allCitizenUnits.push(new Lus( item.id,
                                          null,
                                          item.Area,
                                          item.Serial));
            })

          return allCitizenUnits;
        }
      )
    )
  }

  getCitizenLus(citizen_id: string, lus_id: string): Observable<Lus>{
    return this.http.get(this.webservice+'citizen-lus/get/' + citizen_id + '/' + lus_id).pipe(
      map(res => {

        let rawCitizenLus = res.json().citizen_lus;
        let rawAddressStructure = res.json().structure;
        return new Lus( rawCitizenLus.id,
                        new AddressStructure(rawAddressStructure.id, rawAddressStructure.acc_code, rawAddressStructure.acc_address, null, null),
                        rawCitizenLus.Area,
                        rawCitizenLus.Serial);
        }
      )
    )
  }

  getAllLus(): Observable<Lus[]>{
    return this.http.get(this.webservice+'all-lus/get').pipe(
      map(res => {
        
        let allLus: Lus[] = [];

        res.json()
            .all_lus
            .map( (item: any)=>{
              let rawAddressStructure = res.json().structures.find(x => x.id == item.Structure_id);
              allLus.push(new Lus( item.id,
                                          new AddressStructure(rawAddressStructure.id, rawAddressStructure.acc_code, rawAddressStructure.acc_address, null, null),
                                          item.Area,
                                          item.Serial));
            })

          return allLus;
        }
      )
    )
  }


  // getValidityCertificates(): Observable<ValidityCertificate[]>{
  //   return this.http.get(this.webservice+'validity-certificates/get').pipe(
  //     map(res => {
        
  //       let validityCertificates: ValidityCertificate[] = [];

  //       res.json()
  //           .certificates
  //           .map( (item: any)=>{
  //             let rawLus = res.json().all_lus.find(x => x.id == item.LUS_id);
  //             let rawCitizen = res.json().citizens.find(x => x.id == item.citizen_id);
  //             validityCertificates.push(new ValidityCertificate(item.id,
  //                                                               item.certificate_id,
  //                                                               new Lus(rawLus.id, ), citizen));
  //           })

  //         return validityCertificates;
  //       }
  //     )
  //   )
  // }

  // getLusDecisions(): Observable<LusDecision[]>{
  //   return this.http.get(this.webservice+'lus-decisions/get').pipe(
  //     map(res=>res.json().lus_decisions.map( (item: any)=>{
  //         return new LusDecision(item.id, item.decision_number, item.decision_date);
  //       })
  //     )
  //   )
  // }

}
