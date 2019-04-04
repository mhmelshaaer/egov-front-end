import { MOCK_USERS } from './../../models/users/mock-users';
import { User } from './../../models/users/user';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { MOCK_GROUPS } from './../../models/groups/group-mockup';
import { Group } from './../../models/groups/group';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: Http) { }

  getGroups(): Group[]{
    return MOCK_GROUPS;
  }

  getUsers(): User[]{
    return MOCK_USERS;
  }

}
