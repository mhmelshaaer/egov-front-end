import { Component, OnInit } from '@angular/core';

import {
  faCaretDown
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  faCaretDown = faCaretDown;

  constructor() { }

  ngOnInit() {
  }

}
