import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-navigator',
  templateUrl: './request-navigator.component.html',
  styleUrls: ['./request-navigator.component.scss']
})
export class RequestNavigatorComponent implements OnInit {

  trasactionType: string;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    console.log("RequestNavigatorComponent")

    this.route.params.subscribe(params =>{
      this.trasactionType = params['transaction-type'];
      console.log(this.trasactionType);
    });

  }

  openSelectedStep(event){
    this.router
          .navigate(
            [event.target.value],
            {relativeTo: this.route}
          );
  }

  goBack(){
    this.router.navigate(['/panel-home/requests-list']);
  }


}
