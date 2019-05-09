import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lusrequests-list',
  templateUrl: './lusrequests-list.component.html',
  styleUrls: ['./lusrequests-list.component.scss']
})
export class LUSRequestsListComponent implements OnInit {

  transactionType: string;
  requestID: number;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.transactionType = 'lusrequest'
    this.requestID = 1;

  }

  navigate(transactionType: string, requestID: string){

    // console.log('lusrequests-list Navigate');

    this.router
        .navigate(
          ['panel-home/requests-list/lusrequest-list-all/request-open/'+transactionType+'/'+requestID]
        );

  }

}
