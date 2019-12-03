// angular imports
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component and Service imports
import { AppComponent } from './app.component';
import { SurveyComponent } from './survey/survey.component';
import { SurveyService } from './service/survey.service';
import { HomeComponent } from './home/home.component';

// 3rd party imports
import { AppRoutingModule } from './app-routing.module';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'survey', component: SurveyComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    HomeComponent
  ],
  imports: [
    AccordionModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    TabViewModule
  ],
  providers: [ SurveyService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
