import { RequestsService } from './../../../shared/requests-service/requests.service';
import { Request } from './../../../models/requests/request';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-type-selection',
  templateUrl: './request-type-selection.component.html',
  styleUrls: ['./request-type-selection.component.scss']
})
export class RequestTypeSelectionComponent implements OnInit {

  requests: Request[];

  currURL: string;
  requestsList: string;
  requestsAdd: string;

  selectedTransactionType: string;
  targetComponentRoute: string;
  MOCK_REQUEST_TYPE_METADATA_ROUTE: string;
  MOCK_REQUEST_TYPE_LIST_ALL_ROUTE: string;
  

  constructor(private router: Router,
              private route: ActivatedRoute,
              private requestsService:RequestsService) { }

  ngOnInit() {

    this.requests = [];

    this.requestsService.getRequests().subscribe(data =>{
      this.requests = data;
      console.log(this.requests);
    })

    this.currURL = this.router.url;
    this.requestsList = "/panel-home/requests-list";
    this.requestsAdd = "/panel-home/requests-add";

    this.selectedTransactionType = "";
    this.MOCK_REQUEST_TYPE_METADATA_ROUTE = 'lusrequest-metadata';
    this.MOCK_REQUEST_TYPE_LIST_ALL_ROUTE = 'lusrequest-list-all';

  }

  listRequests(){
    this.getSelectedRequestTypeListAllRoute()
    this.router.navigate([this.targetComponentRoute], {relativeTo: this.route});
    
  }

  getSelectedRequestTypeListAllRoute(){

    /**
     * TODO: we should set the targetComponentRoute based on the selectedTransactionType to navigate
     *       to the suitable request type listing component
     */

    this.targetComponentRoute = this.MOCK_REQUEST_TYPE_LIST_ALL_ROUTE;

  }
  
  addRequests(){
    this.getSelectedRequestTypeMetadataRoute();
    this.router.navigate([this.targetComponentRoute], {relativeTo: this.route});
  }

  getSelectedRequestTypeMetadataRoute(){

    /**
     * TODO: we should set the targetComponentRoute based on the selectedTransactionType to navigate
     *       to the suitable request type add component
     */

    this.targetComponentRoute = this.MOCK_REQUEST_TYPE_METADATA_ROUTE;
    
  }

  isParentURL(url: string){
    return this.currURL.indexOf(url) != -1? true: false;
  }

}
