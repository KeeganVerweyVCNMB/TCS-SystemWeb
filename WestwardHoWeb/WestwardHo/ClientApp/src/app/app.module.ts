import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { ViewComplaintsComponent } from './view-complaints/view-complaints.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { NoticeBoardComponent } from './notice-board/notice-board.component';
import { LogWaterComponent } from './log-water/log-water.component';
import { ViewWaterComponent } from './view-water/view-water.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { ReportsComponent } from './reports/reports.component';
import { RulesComponent } from './housing-rules/rules.component';
import { AddMeetingComponent } from '../shared/add-meeting/add-meeting.component';
import { AddNoteComponent } from '../shared/add-note/add-note.component';
import { AddRuleComponent } from '../shared/add-rule/add-rule.component';
import { HtmlToPDFReportComponent } from './html-to-pdf-report/html-to-pdf-report.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    RegisterComponent,
    ComplaintsComponent,
    ViewComplaintsComponent,
    UpdateProfileComponent,
    NoticeBoardComponent,
    LogWaterComponent,
    ViewWaterComponent,
    MeetingsComponent,
    ReportsComponent,
    RulesComponent,
    AddMeetingComponent,
    AddNoteComponent,
    AddRuleComponent,
    HtmlToPDFReportComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'register', component: RegisterComponent },
      { path: 'log-ticket', component: ComplaintsComponent },
      { path: 'view-ticket', component: ViewComplaintsComponent },
      { path: 'update-profile', component: UpdateProfileComponent },
      { path: 'notice-board', component: NoticeBoardComponent },
      { path: 'log-water-usage', component: LogWaterComponent },
      { path: 'view-water-usage', component: ViewWaterComponent },
      { path: 'meetings', component: MeetingsComponent },
      { path: 'reporting', component: ReportsComponent },
      { path: 'housing-rules', component: RulesComponent },
      { path: 'report-preview/:userID', component: HtmlToPDFReportComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AddMeetingComponent,
    AddNoteComponent,
    AddRuleComponent,
  ]
})
export class AppModule { }
