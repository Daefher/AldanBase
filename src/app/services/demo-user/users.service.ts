import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import * as globals from '../../globals';

import { UserInterface } from '../../interfaces/user-interface';



import { UserDataInterface } from '../../interfaces/user-data-interface';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  user:any;
  loaded: boolean = false;

  private currentUserSubject: BehaviorSubject<UserInterface>;

  public currentuser: Observable<UserInterface>;


  private api_url = globals.api_url + "SystemUser";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(private http: HttpClient) { 
    //this.currentUserSubject = new BehaviorSubject<UserInterface>(JSON.parse(localStorage.getItem('currentUser')));
    //this.currentuser = this.currentUserSubject.asObservable();
  }

  getUserInfo(user_id): Observable<UserDataInterface[]> {
    return this.http.get<UserDataInterface[]>(this.api_url + '/GetById/'+ user_id)
      .pipe(
        catchError(this.errorHandler)
      )
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
