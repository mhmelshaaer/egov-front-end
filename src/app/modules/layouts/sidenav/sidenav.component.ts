import { Component, OnInit } from '@angular/core';

import { 
  faBars,
  faTimes,
  faUsers,
  faListOl
} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  faBars = faBars;
  faTimes = faTimes;
  faUsers = faUsers;
  faListOl = faListOl;

  constructor() { }

  ngOnInit() {
  }

  openMenu() {
    document.getElementById("SideMenu").style.width = "250px";
    document.getElementById("main").style.marginRight = "250px";
    document.getElementById("menu").style.display = "block";
  }

  closeNav() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("main").style.marginRight= "50px";
    document.getElementById("SideMenu").style.width = "0";

  }

}
