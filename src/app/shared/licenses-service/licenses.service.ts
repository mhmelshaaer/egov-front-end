import { map } from 'rxjs/operators';
import { BuildingLicense } from './../../models/building-licenses/building-license';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LicensesService {

  private webservice: String = "http://localhost:8000/api/";

  constructor(private http: Http) { }

  saveBuildingLicenseRequestAttributes(requestInstanceID: string, buildingLicenseRequestAttributes: any) {
    console.log("saving License Attributes...");
    return this.http.post(this.webservice+'building-license-request/update',{
      data: {
        request_instance_id: requestInstanceID, attributes: buildingLicenseRequestAttributes
      }
    });
  }

  saveBuildingLicenseAttributes(buildingLicenseID: string, buildingLicenseAttributes: any) {
    console.log("saving License Attributes...");
    return this.http.post(this.webservice+'building-license/update',{
      data: {
        building_license_id: buildingLicenseID, attributes: buildingLicenseAttributes
      }
    });
  }

  getBuildingLicenseResponse(licenseID: string):Observable<any[]>{
    return this.http.get(this.webservice+'building-license/get-by-license/'+licenseID).pipe(
      map(res => {return res.json().building_license;})
    )
  }
  getBuildingLicenseRequestResponse(requestInstanceID: string):Observable<any[]>{
    return this.http.get(this.webservice+'building-license-request/get-by-request-instance/'+requestInstanceID).pipe(
      map(res => {return res.json().building_license_request;})
    )
  }

  getBuildingLicense(requestInstanceID: string, licenseID: string): Observable<any[]>{
    let response1 = this.getBuildingLicenseResponse(licenseID);
    let response2 = this.getBuildingLicenseRequestResponse(requestInstanceID);
    // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
    return forkJoin([response1, response2]);
  }

}
