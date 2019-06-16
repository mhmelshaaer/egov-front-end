import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/models/users/user';
import { UsersService } from 'src/app/shared/users-service/users.service';
import { GroupUser } from 'src/app/models/group-users/group-user';
import { Group } from 'src/app/models/groups/group';

import {
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  //Fontawesome icons
  faTrashAlt = faTrashAlt;

  users: User[];
  groups: Group[];
  groupUsers: GroupUser[];

  currSelectOption: User;
  currSelctedGroup: Group;
  currGroupUsers: GroupUser[];
  
  newGroup: Group;

  usersConfig: any;  

  constructor(private usersService: UsersService) { }

  ngOnInit() {

    this.usersService.getUsers().subscribe(data => {this.users = data;});
    this.usersService.getGroups().subscribe(data => {this.groups = data;});
    this.usersService.getGroupUsers().subscribe(data => {this.groupUsers = data;});

    this.currSelectOption = null;
    this.currSelctedGroup = new Group(null, "");
    this.currGroupUsers = [];

    this.newGroup = new Group(null, "");

    this.usersConfig = {
      displayKey:"username", //if objects array passed which key to be displayed defaults to description
      search:true, //true/false for the search functionlity defaults to false
      height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
      placeholder:'اسم المستخدم', // text to be displayed when no item is selected defaults to Select
      customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
      limitTo: 10, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
      moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
      noResultsFound: 'Can\'t find a user with this name', // text to be displayed when no items are found while searching
      searchPlaceholder:'بحث', // label thats displayed in search input,
      searchOnKey: 'name', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    }

  }

  ngOnDestroy(){
    console.log(this.groups);
    console.log(this.groupUsers);
    this.usersService.saveGroupUsers(this.groups, this.groupUsers).subscribe();
  }

  selectGroup(){

    this.currGroupUsers = [];
    let currGroupName = this.currSelctedGroup.name;
    this.groupUsers.forEach( x => x.group == currGroupName? this.currGroupUsers.push(x): null);

  }

  addGroup(){
    if(this.newGroup.name != ""){
      this.newGroup.new_group = true;
      this.groups.push(this.newGroup);
      this.newGroup = new Group(null, "", null);
    }else{
      console.log('fuck you');
    }
  }

  addGroupUser(){

    let user = this.currSelectOption;

    let currGroupName = this.currSelctedGroup.name;

    let groupUser = this.currGroupUsers.find(x => x.name == user.username && x.group == currGroupName);

    if(!groupUser){

      let newGroupUser = new GroupUser(null, user.username, currGroupName, true);

      this.groupUsers.push(newGroupUser);
      this.currGroupUsers.push(newGroupUser);

    }else{

    }

    console.log(this.groups);
    console.log(this.groupUsers);
  }

  deleteGroupUser(index: number){

    let currGroupUser = this.currGroupUsers[index];
    
    if(currGroupUser.new_group_user){

      let deletionIndex = this.groupUsers.indexOf(currGroupUser);
      this.groupUsers.splice(deletionIndex, 1);

      this.currGroupUsers.splice(index, 1);

    }else{
      currGroupUser.deleted = true;
      this.groupUsers.forEach(x => x.id == currGroupUser.id? x.deleted = true: null);
    }
    
    console.log(this.currGroupUsers);
    console.log(this.groupUsers);
  }

  deleteGroup(index: number){
    
    let currGroup = this.groups[index];

    if(currGroup.new_group){

      let newGroupUsers = this.groupUsers.filter(x => x.group != currGroup.name);
      this.groupUsers = newGroupUsers;
      this.groups.splice(index, 1);

    }else{
      currGroup.deleted = true;
    }

    this.currGroupUsers = [];
    this.currSelctedGroup.name = "";
    
    console.log(this.currGroupUsers);
    console.log(this.groupUsers);
  }

}
