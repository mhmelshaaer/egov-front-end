import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-module-routing-controller',
  templateUrl: './module-routing-controller.component.html',
  styleUrls: ['./module-routing-controller.component.scss']
})
export class ModuleRoutingControllerComponent implements OnInit {

  hookupURL: string;
  requestsControllerChildRoute: string;
  transactionType: string;
  requestID: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {

    console.log("ModuleRoutingControllerComponent");

    // this.router
    //       .navigate(
    //         ['navigator'],
    //         {relativeTo: this.route}
    //       );

    // this.route.params.subscribe(params=>{

      // this.requestsControllerChildRoute = params["requests-controller-child-route"];
      // this.transactionType = params["transaction-type"];
      // this.requestID = params["request-id"];

      // console.log("ModuleRoutingControllerComponent")

      // this.router
      //     .navigate(
      //       ['navigator'],
      //       {relativeTo: this.route}
      //     );
      
    // });

  }

}
