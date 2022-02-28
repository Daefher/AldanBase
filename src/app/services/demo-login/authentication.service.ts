import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as globals from '../../globals';

//User Interface
import { UserInterface } from '../../interfaces/user-interface';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private api_url = globals.api_url + "Authenticator";

  private currentUserSubject: BehaviorSubject<UserInterface>;

  public currentuser: Observable<UserInterface>;

  constructor(private http: HttpClient) {

    this.currentUserSubject = new BehaviorSubject<UserInterface>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentuser = this.currentUserSubject.asObservable();

  }


  public get currentUserValue(): UserInterface {
    return this.currentUserSubject.value;
  }

  public loggedIn() {
    return !!localStorage.getItem('currentUser')
  }

  getToken() {
    return localStorage.getItem('currentUser')
  }

  login(Email, Password) {

    return this.http.post<any>(this.api_url + '/Authenticate', { Email, Password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));

  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }


}
