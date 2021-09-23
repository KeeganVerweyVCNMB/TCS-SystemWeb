import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private userIDSubject = new Subject<any>();

  sendUserID(userID: string) {
    this.userIDSubject.next({ text: userID });
  }

  clearUserID() {
    this.userIDSubject.next();
  }

  getUserID(): Observable<any> {
    return this.userIDSubject.asObservable();
  }

}
