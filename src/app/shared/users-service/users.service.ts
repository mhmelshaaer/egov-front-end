import { map } from 'rxjs/operators';
import { User } from './../../models/users/user';
import { MOCK_ROLES } from './../../models/roles/role-mockup';
import { MOCK_USERS } from './../../models/group-users/mock-users';
import { GroupUser } from './../../models/group-users/group-user';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { MOCK_GROUPS } from './../../models/groups/group-mockup';
import { Group } from './../../models/groups/group';
import { Role } from 'src/app/models/roles/role';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private webservice: String = "http://localhost:8000/api/";

  constructor(private http: Http) { }

  saveUsers(users: User[]){
    console.log("saving new users...");

    return this.http.post(this.webservice+'users/fetch',{data: users});
  }

  getGroups(): Group[]{
    return MOCK_GROUPS;

    // return this.http.get(this.webservice+'forms/get').pipe(
    //   map(res=>res.json()[1].map( (item: any)=>{
    //       console.log(res.json());
    //       return new Form(item.id, item.form_name)
    //     })
    //   )
    // )
  }

  getUsers(){
    // return MOCK_USERS;

    return this.http.get(this.webservice+'users/get').pipe(
      map(res=>res.json().users.map( (item: any)=>{
          return new User(item.id, item.name, item.password)
        })
      )
    )
  }

  getRoles(): Role[]{
    return MOCK_ROLES;
  }

}
