import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { ViewComplaintsComponent } from './view-complaints/view-complaints.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    RegisterComponent,
    ComplaintsComponent,
    ViewComplaintsComponent,
    UpdateProfileComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'register', component: RegisterComponent },
      { path: 'complaints', component: ComplaintsComponent },
      { path: 'view-complaints', component: ViewComplaintsComponent },
      { path: 'update-profile', component: UpdateProfileComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
