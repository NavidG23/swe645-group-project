import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Student } from '../shared/student.model';
import { SurveyService } from '../service/survey.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StudentList } from '../student-list';
import { NumberSymbol } from '@angular/common';
import { NumberValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

/**
 * General notes about how to debug and run this.
 *
 * Use the developer option in google chrome to see the console log results
 * in the browser click on options-> more tools -> developer tools
 *
 * in order to bypass CORS errors run chrome from the command line with:
 * chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security
 * this can happen when accessing another application that is hosted at a different web address
 * or port than the originating request(in this case our angular app)
 *
 * run with ng serve while in directory of project
 * build/compile with ng run build while in directory of project
 *
 */

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
  providers: [ SurveyService ]
})
export class SurveyComponent implements OnInit {
  @Output() sendSelectedTab = new EventEmitter<number>();
  data: any;
  slist: Student[] = [];
  sdata: any;
  recommend = ['Very Likely', 'Likely', 'Unlikely'];
  liked = [];
  students;
  newStudents = [];
  homeTabSelected: boolean;

  // checkbox booleans
  studentcheck = false;
  locationcheck = false;
  campuscheck = false;
  atmospherecheck = false;
  dormcheck = false;
  sportscheck = false;

  // The following booleans are used as flags to show or hide a div.
  submitted = false;
  showstudents = false;
  showstudent = false;
  loadingsubmit: boolean;
  loadingstudent: boolean;
  loadingstudents: boolean;
  cols: any[];

  model = new Student('', '', '', '', '', '', '', '', '', '', '', '', this.recommend[0]);

  message: string;

  constructor(private svc: SurveyService, private http: HttpClient, private router: Router) {
    this.svc.printToConsole('Survey Service Initiated...');
  }

  ngOnInit() {
    this.cols = [
      { field: 'fname', header: 'First Name' },
      { field: 'lname', header: 'Last Name' },
      { field: 'address', header: 'Address' },
      { field: 'city', header: 'City' },
      { field: 'state', header: 'State' },
      { field: 'zip', header: 'Zipcode' },
      { field: 'phone', header: 'Telephone Number' },
      { field: 'email', header: 'Email' },
      { field: 'date', header: 'Date Survey Completed' },
      { field: 'like', header: 'Liked Most' },
      { field: 'interest', header: 'Interested' },
      { field: 'recommend', header: 'Recommendation' }
    ];
  }

  onSubmit(student: Student) {
    this.submitted = true;
    this.loadingsubmit = true;
    student.liked = this.liked.toString(); // had to inject the liked field here.

    console.log(JSON.stringify(student));

    const httpOpt = {  // these were required to allow a post to interperet the correct data recieved.
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    this.http.post('https://ctsly23uv8.execute-api.us-east-1.amazonaws.com/Production/addstudent', JSON.stringify(student), httpOpt)
      .subscribe((status) => {
        console.log(JSON.stringify(status));
        this.loadingsubmit = false;
      });
  }

  getStudentData(url: string) {
    this.loadingstudents = true;
    this.svc.getAllSurveys('https://ctsly23uv8.execute-api.us-east-1.amazonaws.com/Production/getallstudents')
      .subscribe(newData => {
        this.students = newData;
        this.students.forEach( studentInArray => {
          const personObj = {};
          Object.keys(studentInArray).forEach(keyOfObject => {
            const value = studentInArray[keyOfObject].S;
            personObj[keyOfObject] = value;
          });
          this.newStudents.push(personObj);
        });
      });
    this.loadingstudents = false;
    this.showstudents = true;
  }

  goBackToHomePage(url: string) {
    this.homeTabSelected = true;
    this.svc.changeToHomeTab(this.homeTabSelected);
    this.router.navigate([url]);
  }

  clearForm(surveyForm: NgForm) {
    // TODO: work with Alec to fix this bug
    /* this.checkUpdate(null, true); */
    surveyForm.reset();
  }

  checkUpdate(check: any) {
    if (this.studentcheck === false && check === 'Students') {
      this.studentcheck = true;
      this.liked.push(check);
    } else if (this.studentcheck === true && check === 'Students') {
      this.studentcheck = false;
      this.liked = this.liked.filter(item => item !== check);
    }

    if (this.locationcheck === false && check === 'Location') {
      this.locationcheck = true;
      this.liked.push(check);
    } else if (this.locationcheck === true && check === 'Location') {
      this.locationcheck = false;
      this.liked = this.liked.filter(item => item !== check);
    }

    if (this.campuscheck === false && check === 'Campus') {
      this.campuscheck = true;
      this.liked.push(check);
    } else if (this.campuscheck === true && check === 'Campus') {
      this.campuscheck = false;
      this.liked = this.liked.filter(item => item !== check);
    }

    if (this.atmospherecheck === false && check === 'Atmosphere') {
      this.atmospherecheck = true;
      this.liked.push(check);
    } else if (this.atmospherecheck === true && check === 'Atmosphere') {
      this.atmospherecheck = false;
      this.liked = this.liked.filter(item => item !== check);
    }

    if (this.dormcheck === false && check === 'Dorm Rooms') {
      this.dormcheck = true;
      this.liked.push(check);
    } else if (this.dormcheck === true && check === 'Dorm Rooms') {
      this.dormcheck = false;
      this.liked = this.liked.filter(item => item !== check);
    }

    if (this.sportscheck === false && check === 'Sports') {
      this.sportscheck = true;
      this.liked.push(check);
    } else if (this.sportscheck === true && check === 'Sports') {
      this.sportscheck = false;
      this.liked = this.liked.filter(item => item !== check);
    }
    this.model.liked = this.liked.toString();
  }

}
