import { Component, OnInit } from '@angular/core';

import {
  faUsers,
  faListOl
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  faUsers = faUsers;
  faListOl = faListOl;
  
  constructor() { }

  ngOnInit() {
    // Get the element with id="defaultOpen" and click on it
    document.getElementById("requiredStepsDefaultOpen").click();
    document.getElementById("groupManagementDefaultOpen").click();
  }

  openTab(evt, tabClassName, linkClassName, terget, display="block") {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName(tabClassName);
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName(linkClassName);
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(terget).style.display = display;
    evt.currentTarget.className += " active";
  }

  closeTab(terget){
      document.getElementById(terget).style.display = "none";
  }

}
