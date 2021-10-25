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

  register(name: string, surname: string, emailAddress: string, phoneNumber: string, unitNumber: string, moveInYear: string, password: string): Promise<any> {
    return this.http.post<any>(`${environment.apiUrl}/UserAuth/RegisterUser`, { Name: name, Surname: surname, EmailAddress: emailAddress, PhoneNumber: phoneNumber, UnitNumber: unitNumber, MoveInYear: moveInYear, Password: password })
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
    return this.http.get<any>(`${environment.apiUrl}/Complaints/DeleteComplaint?complaintID=` + complaintID)
      .toPromise()
      .then(response => {
        return response;
      }).catch(error => {
        return Promise.reject(error);
      });
  }

  updateUserProfile(name: string, surname: string, emailAddress: string, phoneNumber: string, unitNumber: string, moveInYear: string, userID: string): Promise<any> {
    return this.http.post<any>(`${environment.apiUrl}/UserAuth/UpdateUserProfile`, { Name: name, Surname: surname, EmailAddress: emailAddress, PhoneNumber: phoneNumber, UnitNumber: unitNumber, MoveInYear: moveInYear, UserID: userID })
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

  logWater(userID: string, unit: string, name: string, usage: string, billed: string, dateStart: string, dateEnd: string): Promise<any> {
    return this.http.post<any>(`${environment.apiUrl}/Complaints/LogWater`, { UserID: userID, Unit: unit, Name: name, Usage: usage, Billed: billed, DateStart: dateStart, DateEnd: dateEnd })
      .toPromise()
      .then(response => {
        return response;
      }).catch(error => {
        return Promise.reject(error);
      });
  }

  addNote(title: string, note: string, userID: string): Promise<any> {
    return this.http.post<any>(`${environment.apiUrl}/Complaints/AddNote`, { Title: title, Note: note, UserID: userID })
      .toPromise()
      .then(response => {
        return response;
      }).catch(error => {
        return Promise.reject(error);
      });
  }

  getNotes(): Promise<any> {
    return this.http.get<any>(`${environment.apiUrl}/Complaints/GetNotes`)
      .toPromise()
      .then(response => {
        return response;
      }).catch(error => {
        return Promise.reject(error);
      });
  }

  deleteNote(noteID: string): Promise<any> {
    return this.http.get<any>(`${environment.apiUrl}/Complaints/DeleteNote?noteID=` + noteID)
      .toPromise()
      .then(response => {
        return response;
      }).catch(error => {
        return Promise.reject(error);
      });
  }

  addRule(title: string, rule: string, userID: string): Promise<any> {
    return this.http.post<any>(`${environment.apiUrl}/Complaints/AddRule`, { Title: title, Rule: rule, UserID: userID })
      .toPromise()
      .then(response => {
        return response;
      }).catch(error => {
        return Promise.reject(error);
      });
  }

  getRules(): Promise<any> {
    return this.http.get<any>(`${environment.apiUrl}/Complaints/GetRules`)
      .toPromise()
      .then(response => {
        return response;
      }).catch(error => {
        return Promise.reject(error);
      });
  }

  addMeeting(title: string, host: string, link: string, userID: string): Promise<any> {
    return this.http.post<any>(`${environment.apiUrl}/Complaints/AddMeeting`, { Title: title, Host: host, Link: link, UserID: userID })
      .toPromise()
      .then(response => {
        return response;
      }).catch(error => {
        return Promise.reject(error);
      });
  }

  getMeetings(): Promise<any> {
    return this.http.get<any>(`${environment.apiUrl}/Complaints/GetMeetings`)
      .toPromise()
      .then(response => {
        return response;
      }).catch(error => {
        return Promise.reject(error);
      });
  }

  deleteMeeting(meetingID: string): Promise<any> {
    return this.http.get<any>(`${environment.apiUrl}/Complaints/DeleteMeeting?meetingID=` + meetingID)
      .toPromise()
      .then(response => {
        return response;
      }).catch(error => {
        return Promise.reject(error);
      });
  }

  getReports(): Promise<any> {
    return this.http.get<any>(`${environment.apiUrl}/Complaints/GetReports`)
      .toPromise()
      .then(response => {
        return response;
      }).catch(error => {
        return Promise.reject(error);
      });
  }

  getWater(): Promise<any> {
    return this.http.get<any>(`${environment.apiUrl}/Complaints/GetWater`)
      .toPromise()
      .then(response => {
        return response;
      }).catch(error => {
        return Promise.reject(error);
      });
  }

  getWaterByLoggedInUserID(userID: string): Promise<any> {
    return this.http.get<any>(`${environment.apiUrl}/Complaints/GetWaterByLoggedInUserID?userID=` + userID)
      .toPromise()
      .then(response => {
        return response;
      }).catch(error => {
        return Promise.reject(error);
      });
  }

  getComplaintsByLoggedInUserID(userID: string): Promise<any> {
    return this.http.get<any>(`${environment.apiUrl}/Complaints/GetComplaintsByLoggedInUserID?userID=` + userID)
      .toPromise()
      .then(response => {
        return response;
      }).catch(error => {
        return Promise.reject(error);
      });
  }

  getCanUserViewComplaints(userID: string): Promise<any> {
    return this.http.get<any>(`${environment.apiUrl}/Complaints/GetCanUserViewComplaints?userID=` + userID)
      .toPromise()
      .then(response => {
        return response;
      }).catch(error => {
        return Promise.reject(error);
      });
  }
}
