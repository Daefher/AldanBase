import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import * as globals from '../../globals';

import { UserInterface } from '../../interfaces/user-interface';



import { UserDataInterface } from '../../interfaces/user-data-interface';
import { FormGroup } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  user: any;
  loaded: boolean = false;

  private currentUserSubject: BehaviorSubject<UserInterface>;

  public currentuser: Observable<UserInterface>;

  private currentUserInfo: BehaviorSubject<UserDataInterface>;
  //public currentUserInfo : Observable<UserDataInterface>;

  protected user_data_info: UserDataInterface;
  private api_url = globals.api_url + "SystemUser";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserInterface>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentuser = this.currentUserSubject.asObservable();
    this.currentUserInfo = new BehaviorSubject<UserDataInterface>(null);
  }

  /**
   * This Function get the current values from the user log in, if no user found returns null
   */
  get getCurrentUserInfo() {
    var curUserVal = this.currentUserValue;
    try {
      if (curUserVal) {
        this.getUserInfo(curUserVal.systemUserId).subscribe((data) => {
          this.user_data_info = data[0];
          //console.log("data",data[0]);
          this.currentUserInfo.next(data[0]);
          //console.log("currentUserInfo", this.currentUserInfo);
        },
          err => {
            this.currentUserInfo.next(null);
            //console.log("error");
          });
      } else {
        return undefined;
      }
    } catch (error) {
      console.log(error);
    }
    return this.currentUserInfo.asObservable();
  }

  set setCurrentUserInfo(userInfo: UserDataInterface) {
    this.currentUserInfo.next(userInfo);
  }

  public get currentUserValue(): UserInterface {
    return this.currentUserSubject.value;
  }

  getUserInfo(user_id): Observable<UserDataInterface[]> {
    //console.log("user_id", user_id);
    return this.http.get<UserDataInterface[]>(this.api_url + '/GetById/' + user_id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(id, post): Observable<UserDataInterface> {

    return this.http.post<UserDataInterface>(this.api_url + '/Update', JSON.stringify([post]), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );

  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
