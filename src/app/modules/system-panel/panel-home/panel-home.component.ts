import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-home',
  templateUrl: './panel-home.component.html',
  styleUrls: ['./panel-home.component.scss']
})
export class PanelHomeComponent implements OnInit {

  amount: number = 100.25;

  constructor() { }

  ngOnInit() {
  }


}
