import { Component } from '@angular/core';
import { SurveyService } from './service/survey.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  homeTabSelected = false;
  surveyTabSelected = false;
  title = 'survey';

  constructor(private router: Router, private svc: SurveyService) { }

  ngOnInit() {
    this.svc.tabSelection.subscribe(message => this.homeTabSelected = message);
  }

  ngOnChanges() {
  }

  handleRoutes(e) {
    const index = e.index;
    let link;
    switch (index) {
      case 0:
        link = ['/home'];
        break;
      case 1:
        link = ['/survey'];
        break;
    }
    this.router.navigate(link);
  }
}
