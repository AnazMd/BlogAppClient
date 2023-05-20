import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.baseUrl;
  private isAuthenticated: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    this.isAuthenticated = new BehaviorSubject<boolean>(this.getToken() !== null);
  }

  login(credentials: { username: string, password: string }): Observable<any> {
    const body = {
      username: credentials.username,
      password: credentials.password,
    };
    const loginUrl = `${this.apiUrl}/api/account`;
    console.log(loginUrl)
    return this.http.post<LoginResponse>(loginUrl, body).pipe(
      map(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.isAuthenticated.next(true);
          return true;
        } 
        return false;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

   getToken(): string | null {
    return localStorage.getItem('token');
   }
  
  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }
}


// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { Observable, BehaviorSubject } from 'rxjs';
// import { map } from 'rxjs/operators';

// interface LoginResponse {
//   token: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl: string = 'http://localhost:7201';
//   private isAuthenticated: BehaviorSubject<boolean>;

//   constructor(private http: HttpClient, private router: Router) { 
//     this.isAuthenticated = new BehaviorSubject<boolean>(this.getToken() !== null);
//   }

//   login(credentials: { username: string, password: string }): Observable<any> {
//     const body = {
//       username: credentials.username,
//       password: credentials.password,
//     };
//     console.log(body)
//     return this.http.post<LoginResponse>(`${this.apiUrl}/api/account`, body).pipe(
//       map(response => {
//         if (response.token) {
//           localStorage.setItem('token', response.token);
//           this.isAuthenticated.next(true);
//           return true;
//         } 
//         return false;
//       })
//     );
//   }

//   logout(): void {
//     localStorage.removeItem('token');
//     this.isAuthenticated.next(false);
//     this.router.navigate(['/login']);
//   }

//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }

//   isLoggedIn(): Observable<boolean> {
//     return this.isAuthenticated.asObservable();
//   }
// }

