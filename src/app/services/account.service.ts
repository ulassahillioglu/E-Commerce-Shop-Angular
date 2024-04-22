// import { Injectable } from '@angular/core';
// import { User } from '../login/user';

// @Injectable()
// export class AccountService {

//   constructor() { }

//   loggedIn = false;
//   login(user : User):boolean{
//     if(user.username == 'admin' && user.password == '12345'){
//       this.loggedIn = true;
//       localStorage.setItem('isLogged', user.username);
//       return true;
//     }
//     return false;
//   }
  
//   isLoggedIn(){
//     return this.loggedIn;
//   }

//   logOut(){
//     localStorage.removeItem('isLogged');
//     this.loggedIn = false;
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { User } from '../login/user';
import { response } from 'express';
import { UserSignup } from '../signup/signup.component';

@Injectable()
export class AccountService {
  
  private apiUrl = 'https://ulassahillioglu.pythonanywhere.com/';
  private loggedIn = false;
  private _isAdmin = false;
  

  constructor(private http: HttpClient) {
    // Check if user is already logged in by checking localStorage
    this.loggedIn = !!localStorage.getItem('token');
    
  }

  checkSuperuser(): Observable<{ is_superuser: boolean }> {
    const token = localStorage.getItem('token');
    
    // Create headers object with Authorization token
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
  
    // Attach headers to the HTTP request options
    const options = { headers: headers };
  
    // Make the GET request with the options
    return this.http.get<{ is_superuser: boolean }>(`${this.apiUrl}is_superuser/`, options);
  }

  checkAdmin(): boolean {
    return this._isAdmin;
}


  isLoggedIn(): boolean {
    return this.loggedIn;
  }


  signup(user:UserSignup): Observable<any>{
    let username = user.username;
    let password = user.password
    let email = user.email

    return this.http.post<any>(`${this.apiUrl}signup/`,{username,password,email}).pipe(
      map(response =>{
        console.log(`Registration for user ${response.user.username} is successful`)
      })
    )
  }


  login(user:User): Observable<any> {
    let username = user.username
    let password = user.password
    
    
    return this.http.post<any>(`${this.apiUrl}login/`, { username, password }).pipe(
      map(response => {
        // Update loggedIn status upon successful login
        this.loggedIn = true;
        this._isAdmin = response.user.is_superuser;
        localStorage.setItem('user_id',response.user.id);
        localStorage.setItem('user',response.user.is_superuser);
        localStorage.setItem('token', response.token);
        return response
      })
    );
  }

  

  logOut(): void {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this._isAdmin = false;
  }
}
