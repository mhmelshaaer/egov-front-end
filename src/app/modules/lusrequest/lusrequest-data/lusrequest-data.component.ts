import { BuildingLicenseAttributes } from './../../../interfaces/building-license-attributes/building-license-attributes';
import { LicensesService } from './../../../shared/licenses-service/licenses.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TransactionsService } from './../../../shared/transactions-service/transactions.service';
import { EngineersService } from './../../../shared/engineers-service/engineers.service';
import { EngineeringOfficesService } from './../../../shared/engineering-offices-service/engineering-offices.service';
import { LandsService } from './../../../shared/lands-service/lands.service';

import { BuildingLicense } from './../../../models/building-licenses/building-license';
import { Engineer } from './../../../models/engineers/engineer';
import { EngineeringOffice } from './../../../models/engineering-offices/engineering-office';
import { LusDecision } from './../../../models/lus-decisions/lus-decision';
import { ValidityCertificate } from './../../../models/validity-certificates/validity-certificate';
import { RequestInstance } from 'src/app/models/request-instances/request-instance';
import { Transaction } from 'src/app/models/transactions/transaction';
import { Subscription } from 'rxjs';
import { Lus } from 'src/app/models/lus/lus';

@Component({
  selector: 'app-lusrequest-data',
  templateUrl: './lusrequest-data.component.html',
  styleUrls: ['./lusrequest-data.component.scss']
})
export class LUSRequestDataComponent implements OnInit {

  requestInstanceSubscription: Subscription;
  transactionSubscription: Subscription;

  buildingLicense: BuildingLicense;
  buildingLicenseAttributes: BuildingLicenseAttributes;

  requestInstanceID: string;
  requestInstance: RequestInstance;
  transaction: Transaction;

  validityCertificate: ValidityCertificate;
  lusDecision: LusDecision;

  engineeringOffices: EngineeringOffice[];
  engineers: Engineer[];

  currEngineeringOffice: EngineeringOffice;
  currEngineer: Engineer;
  currCitizenLand: Lus;
  currSyndicateRegRumber: string;
  currTaxCard: string;
  currCommercialRegister: string;
  currEngineerRegisterNumber: string;

  engineeringOfficesConfig: any;
  engineersConfig: any;

  constructor(private route: ActivatedRoute,
              private transactionsService:TransactionsService,
              private landsService:LandsService,
              private engineeringOfficesService:EngineeringOfficesService,
              private engineersService:EngineersService,
              private licensesService:LicensesService) {}

  ngOnInit() {
    
    this.buildingLicense = new BuildingLicense();
    this.validityCertificate = new ValidityCertificate(null, null, null, null);
    this.lusDecision = new LusDecision(null, null);
    this.requestInstance = new RequestInstance(null, null, null, null);
    this.transaction = new Transaction(null, null, null, new Lus(null, null, null, null));

    this.currEngineeringOffice = null;
    this.currEngineer = null;
    this.currCitizenLand = new Lus(null, null, null, null);
    this.currSyndicateRegRumber = "";
    this.currTaxCard = "";
    this.currCommercialRegister = "";
    this.currEngineerRegisterNumber = "";

    this.engineeringOffices = [];
    this.engineers = [];

    this.engineeringOfficesService.getEngineeringOffices().subscribe(data=>{this.engineeringOffices=data});
    this.engineersService.getEngineers().subscribe(data=>{this.engineers=data});

    this.requestInstance = this.transactionsService.defaultRequestInstance;
    this.transaction = this.transactionsService.defaultTransaction;
    this.updateComponentState(this.requestInstance, this.transaction);
    
    // this.requestInstanceSubscription = this.transactionsService.requestInstance$.subscribe(
    //   requestInstance =>{
    //     this.requestInstance = requestInstance;
    //     this.updateComponentState(requestInstance, null);
    //   }
    // )

    // this.transactionSubscription = this.transactionsService.transaction$.subscribe(
    //   transaction =>{
    //     this.transaction = transaction;
    //     this.updateComponentState(null, transaction);
    //   }
    // )
    
    this.engineeringOfficesConfig = {
      displayKey:"name", //if objects array passed which key to be displayed defaults to description
      search:true, //true/false for the search functionlity defaults to false
      height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
      placeholder:'المكتب الهندسى', // text to be displayed when no item is selected defaults to Select
      customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
      limitTo: 10, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
      moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
      noResultsFound: 'لا يوجد', // text to be displayed when no items are found while searching
      searchPlaceholder:'بحث', // label thats displayed in search input,
      searchOnKey: 'name', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    }
    this.engineersConfig = {
      displayKey:"name", //if objects array passed which key to be displayed defaults to description
      search:true, //true/false for the search functionlity defaults to false
      height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
      placeholder:'المهندس الإستشارى', // text to be displayed when no item is selected defaults to Select
      customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
      limitTo: 10, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
      moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
      noResultsFound: 'لا يوجد', // text to be displayed when no items are found while searching
      searchPlaceholder:'بحث', // label thats displayed in search input,
      searchOnKey: 'name', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    }

  }

  ngOnDestroy(){
    // this.requestInstanceSubscription.unsubscribe();
    // this.transactionSubscription.unsubscribe();
  }

  saveChanges(){

    this.buildingLicense.ENG_Office_ID = this.currEngineeringOffice? this.currEngineeringOffice.id: null;
    this.buildingLicense.Request_Eng_id = this.currEngineer? this.currEngineer.id: null;
    this.buildingLicense.Land_Area = this.currCitizenLand.area;
    this.buildingLicense.Certificate_id = this.validityCertificate.id;

    this.initializeBuildingLicenseAttributes(this.buildingLicense);

    this.licensesService
        .saveBuildingLicenseRequestAttributes(""+this.requestInstance.id, this.buildingLicenseAttributes)
        .subscribe(
          response1 => {
            let buildingLicenseId = response1.json().building_license_request.Build_License_id;
            this.licensesService
                .saveBuildingLicenseAttributes(buildingLicenseId, this.buildingLicenseAttributes)
                .subscribe()
          }
    );
    
  }

  updateComponentState(requestInstance: RequestInstance, transaction: Transaction){
    
    requestInstance? this.requestInstance=requestInstance: null;
    transaction? this.transaction=transaction: null;

    if(transaction){
      this.landsService
        .getCitizenValidityCertificate(""+this.requestInstance.customer.id, ""+this.transaction.lus.id)
        .subscribe(data=>this.validityCertificate=data);

      this.landsService
        .getCitizenLusDecision(""+this.requestInstance.customer.id, ""+this.transaction.lus.id)
        .subscribe(data=>this.lusDecision=data);

      this.landsService
          .getCitizenLus(""+this.requestInstance.customer.id, ""+this.transaction.lus.id)
          .subscribe(data=>this.currCitizenLand=data);

      let newBuildingLicense = new BuildingLicense();
      this.initializeBuildingLicenseAttributes(newBuildingLicense);
      this.licensesService
        .saveBuildingLicenseRequestAttributes(""+this.requestInstance.id, this.buildingLicenseAttributes)
        .subscribe(
          response1 => {
            let rawAttributes1 = response1.json().attributes;
            let buildingLicenseId = response1.json().building_license_request.Build_License_id;

            this.licensesService
                .saveBuildingLicenseAttributes(buildingLicenseId, this.buildingLicenseAttributes)
                .subscribe(
                  response2 =>{
                    let rawAttributes2 = response2.json().attributes;
                    let rawAttributesKeys = Object.keys(rawAttributes2);

                    rawAttributesKeys.forEach(key => {
                      !rawAttributes2[key]? rawAttributes2[key]=rawAttributes1[key]: null
                    });
                    this.initializeBuildingLicense(rawAttributes2);
                  }
                )
          }
        );

    }

  }

  initializeBuildingLicenseAttributes(buildingLicense: BuildingLicense){
    
    let newBuildingLicenseAttributes: BuildingLicenseAttributes = {
      Working_Area: this.buildingLicense.Working_Area,
      P_North: this.buildingLicense.P_North,
      P_South: this.buildingLicense.P_South,
      P_East: this.buildingLicense.P_East,
      P_West: this.buildingLicense.P_West,
      North_RODOD: this.buildingLicense.North_RODOD,
      South_RODOD: this.buildingLicense.South_RODOD,
      East_RODOD: this.buildingLicense.East_RODOD,
      West_RODOD: this.buildingLicense.West_RODOD,
      North_length: this.buildingLicense.North_length,
      South_Length: this.buildingLicense.South_Length,
      East_length: this.buildingLicense.East_length,
      West_length: this.buildingLicense.West_length,
      D_North: this.buildingLicense.D_North,
      D_South: this.buildingLicense.D_South,
      D_East: this.buildingLicense.D_East,
      D_West: this.buildingLicense.D_West,
      Work_Description: this.buildingLicense.Work_Description,
      Request_Description: this.buildingLicense.Request_Description,
      Certificate_id: this.buildingLicense.Certificate_id,
      ENG_Office_ID: this.buildingLicense.ENG_Office_ID,
      Request_Eng_id: this.buildingLicense.Request_Eng_id,
      Work_Category: this.buildingLicense.Work_Category,
      Units_Number: this.buildingLicense.Units_Number,
      License_Type: this.buildingLicense.License_Type,
      Buliding_Type_id: this.buildingLicense.Buliding_Type_id,
      Repeated_Number: this.buildingLicense.Repeated_Number,
      Land_Area: this.buildingLicense.Land_Area
    };

    this.buildingLicenseAttributes = newBuildingLicenseAttributes;
  }

  initializeBuildingLicense(buildingLicenseAttributes: BuildingLicenseAttributes){
    let keys = Object.keys(buildingLicenseAttributes);
    keys.forEach(key =>{
      this.buildingLicense[key] = buildingLicenseAttributes[key];
    });
  }

  populateEngineeringOfficeFields(){
    this.currSyndicateRegRumber = this.currEngineeringOffice? this.currEngineeringOffice.syndicate_reg_number: "";
    this.currTaxCard = this.currEngineeringOffice? this.currEngineeringOffice.tax_card: "";
    this.currCommercialRegister = this.currEngineeringOffice? this.currEngineeringOffice.commercial_register: "";
  }

  populateEngineerFields(){
    this.currEngineerRegisterNumber = this.currEngineer? this.currEngineer.register_number: "";
  }

}
