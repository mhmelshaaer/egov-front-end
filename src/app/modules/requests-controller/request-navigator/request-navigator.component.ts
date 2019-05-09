import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-navigator',
  templateUrl: './request-navigator.component.html',
  styleUrls: ['./request-navigator.component.scss']
})
export class RequestNavigatorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

    console.log("RequestNavigatorComponent")

  }

  goBack(){
    this.router.navigate(['/panel-home/requests-list']);
  }


}
