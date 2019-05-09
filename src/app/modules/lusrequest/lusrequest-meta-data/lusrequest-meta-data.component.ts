import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lusrequest-meta-data',
  templateUrl: './lusrequest-meta-data.component.html',
  styleUrls: ['./lusrequest-meta-data.component.scss']
})
export class LUSRequestMetaDataComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goBack(){
    this.router.navigate(['/panel-home/requests-add']);
  }

}
