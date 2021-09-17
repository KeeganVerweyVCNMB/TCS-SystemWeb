import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(private router: Router, private http: HttpClient) { }

  getComplaints(): Promise<any> {
    return this.http.get<any>(`${environment.apiUrl}/Complaints/GetComplaints`)
      .toPromise()
      .then(response => {
        return response;
      }).catch(error => {
        return Promise.reject(error);
      });
  }

  login(email: string, password: string): Promise<any> {
    return this.http.post<any>(`${environment.apiUrl}/UserAuth/LoginUser`, { EmailAddress: email, Password: password })
      .toPromise()
      .then(response => {
        return response;
      }).catch(error => {
        return Promise.reject(error);
      });
  }

  register(name: string, surname: string, emailAddress: string, phoneNumber: string, moveInYear: string, password: string): Promise<any> {
    return this.http.post<any>(`${environment.apiUrl}/UserAuth/RegisterUser`, { Name: name, Surname: surname, EmailAddress: emailAddress, PhoneNumber: phoneNumber, MoveInYear: moveInYear, Password: password })
      .toPromise()
      .then(response => {
        return response;
      }).catch(error => {
        return Promise.reject(error);
      });
  }

  addComplaint(complaintTitle: string, complaintDescription: string, userID: string): Promise<any> {
    return this.http.post<any>(`${environment.apiUrl}/Complaints/AddComplaint`, { ComplaintTitle: complaintTitle, ComplaintDescription: complaintDescription, UserID: userID })
      .toPromise()
      .then(response => {
        return response;
      }).catch(error => {
        return Promise.reject(error);
      });
  }

  updateComplaintStatus(complaintID: string, complaintStatus): Promise<any> {
    return this.http.post<any>(`${environment.apiUrl}/Complaints/UpdateComplaintStatus`, { ComplaintsID: complaintID, ComplaintStatus: complaintStatus })
      .toPromise()
      .then(response => {
        return response;
      }).catch(error => {
        return Promise.reject(error);
      });
  }

  deleteComplaint(complaintID: string): Promise<any> {
    return this.http.post<any>(`${environment.apiUrl}/Complaints/DeleteComplaint`, { ComplaintsID: complaintID })
      .toPromise()
      .then(response => {
        return response;
      }).catch(error => {
        return Promise.reject(error);
      });
  }

  updateUserProfile(name: string, surname: string, emailAddress: string, phoneNumber: string, moveInYear: string, userID: string): Promise<any> {
    return this.http.post<any>(`${environment.apiUrl}/UserAuth/UpdateUserProfile`, { Name: name, Surname: surname, EmailAddress: emailAddress, PhoneNumber: phoneNumber, MoveInYear: moveInYear, UserID: userID })
      .toPromise()
      .then(response => {
        return response;
      }).catch(error => {
        return Promise.reject(error);
      });
  }

  getUserByID(userID: string): Promise<any> {
    return this.http.get<any>(`${environment.apiUrl}/UserAuth/GetUserByID?userID=` + userID)
      .toPromise()
      .then(response => {
        return response;
      }).catch(error => {
        return Promise.reject(error);
      });
  }
}
