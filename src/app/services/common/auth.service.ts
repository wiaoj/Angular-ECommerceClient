import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private jwtHelper: JwtHelperService) {}

  identityCheck() {
    const token: string = localStorage.getItem('accessToken'); // LocalStorage'den tokeni çağırıyoruz varsa gelir yoksa null döner
    // npm i @auth0/angular-jwt ile interceptor yazmadan bu kütüphane sayesinde kullanabiliyoruz

    //const decodeToken = this.jwtHelper.decodeToken(token); // Tokenin içindeki bilgileri görürüz
    //const expirationDate: Date = this.jwtHelper.getTokenExpirationDate(token); // Token bitiş tarihini görürüz
    let expired: boolean; // = this.jwtHelper.isTokenExpired(token); // Tokenin süresinin bitip bitmediğini görebiliriz

    try {
      expired = this.jwtHelper.isTokenExpired(token);
    } catch {
      expired = true;
    }

    _isAuthenticated = token != null && !expired;
  }

  get isAuthenticated(): boolean {
    return _isAuthenticated;
  }
}

export let _isAuthenticated: boolean; // Global değişken oluşturduk
