import { Subject, BehaviorSubject } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from '../shared/student.model';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private homeTabSelected = new BehaviorSubject(false);
  tabSelection = this.homeTabSelected.asObservable();

  constructor(private http: HttpClient) {}

  changeToHomeTab(selected: boolean) {
    this.homeTabSelected.next(selected);
  }

  getAllSurveys(url: string) {
    return this.http.get(url);
  }

  public async saveSurvey(student: Student, loadingsubmit) {

  }

  printToConsole(arg) {
    console.log(arg);
  }
}
