import { map } from 'rxjs/operators';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { User } from './../../models/users/user';
import { GroupUser } from './../../models/group-users/group-user';
import { Group } from './../../models/groups/group';
import { Role } from 'src/app/models/roles/role';

import { MOCK_ROLES } from './../../models/roles/role-mockup';
import { Observable } from 'rxjs';

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

  saveGroupUsers(groups: Group[], groupUsers: GroupUser[]){
    console.log("saving new groupUsers...");
    console.log(groups);
    console.log(groupUsers);

    return this.http.post(this.webservice+'groupUsers/fetch',{data: {groups: groups, groupUsers: groupUsers}});
  }

  getGroups(): Observable<Group[]>{
    return this.http.get(this.webservice+'groups/get').pipe(
      map(res=>res.json().groups.map( (item: any)=>{
          return new Group(item.id, item.group_name)
        })
      )
    )
  }

  getGroupUsers(): Observable<GroupUser[]>{
    return this.http.get(this.webservice+'groupUsers/get').pipe(
      map(res => {
        
        let groupUsers: GroupUser[] = [];

        res.json()
            .groupUsers
            .map( (item: any)=>{
              let group = res.json().groups.find(x => x.id == item.group_id);
              let user = res.json().users.find(x => x.id == item.user_id);
              groupUsers.push(new GroupUser(item.id, user.name, group.group_name));
            })

          return groupUsers;
        }
      )
    )
  }

  getUsers(): Observable<User[]>{
    return this.http.get(this.webservice+'users/get').pipe(
      map(res=>res.json().users.map( (item: any)=>{
          if(item.employee_id){
            return new User(item.id, item.name, item.password)
          }
        })
      )
    )
  }

  getCustomersResponse(): Observable<User[]>{
    return this.http.get(this.webservice+'customers/get').pipe(
      map(res=>res.json().customers)
    )
  }

  getRoles(): Role[]{
    return MOCK_ROLES;
  }

}
