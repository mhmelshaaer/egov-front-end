import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-open-request',
  templateUrl: './open-request.component.html',
  styleUrls: ['./open-request.component.scss']
})
export class OpenRequestComponent implements OnInit {


  transactionType: string;
  requestID: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    console.log('OpenRequestComponent');

    this.route.params.subscribe(params=>{
      this.transactionType = params["transaction-type"];
      this.requestID = params["request-id"];

      console.log(this.transactionType,
                  this.requestID);

      if(this.transactionType){

        console.log("open-request-then")
        
      }else{

        console.log("open-request-else")
            
      }
      
    });
  }

}
