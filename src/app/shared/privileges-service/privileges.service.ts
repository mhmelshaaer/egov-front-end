import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Privilege } from 'src/app/models/privileges/Privilege';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrivilegesService {

  private webservice: String = "http://localhost:8000/api/";

  constructor(private http: Http) { }

  savePrivileges(privileges: Privilege[]){
    console.log("saving new privileges...");

    return this.http.post(this.webservice+'privileges/fetch',{data: privileges});
  }

  getPrivileges(): Observable<Privilege[]>{
    return this.http.get(this.webservice+'privileges/get').pipe(
      map(res => {
        
        let privileges: Privilege[] = [];

        res.json()
            .privileges
            .map( (item: any)=>{

              let newModule = res.json().modules.find(x => x.id == item.module_id);
              let newForm = res.json().forms.find(x => x.id == item.form_id);
              let newGroup = res.json().groups.find(x => x.id == item.group_id);

              let newPrivilege = new Privilege( item.id,
                                                item.name,
                                                newModule,
                                                newForm,
                                                newGroup,
                                                item.insert,
                                                item.update,
                                                item.delete);

              privileges.push(newPrivilege);
              console.log(privileges);
            })

          return privileges;
        }
      )
    )
  }

}
