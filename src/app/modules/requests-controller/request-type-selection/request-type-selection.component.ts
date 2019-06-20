import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-type-selection',
  templateUrl: './request-type-selection.component.html',
  styleUrls: ['./request-type-selection.component.scss']
})
export class RequestTypeSelectionComponent implements OnInit {

  currURL: string;
  requestsList: string;
  requestsAdd: string;

  selectedTransactionType: string;
  targetComponentRoute: string;
  MOCK_REQUEST_TYPE_METADATA_ROUTE: string;
  MOCK_REQUEST_TYPE_LIST_ALL_ROUTE: string;
  

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

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

  getSelectedRequestTypeListAllRoute(){

    /**
     * TODO: we should set the targetComponentRoute based on the selectedTransactionType to navigate
     *       to the suitable request type listing component
     */

    this.targetComponentRoute = this.MOCK_REQUEST_TYPE_LIST_ALL_ROUTE;

  }

  isParentURL(url: string){
    return this.currURL.indexOf(url) != -1? true: false;
  }

}
