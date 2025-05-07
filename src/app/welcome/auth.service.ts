import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAccess: boolean = false;
  private userName: string = '';

  constructor(private http: HttpClient, private afAuth: AngularFireAuth) {}

  onSignUp(requestBody: any) {
    let body = {
      email: requestBody.emailAdd,
      password: requestBody.password,
      returnSecureToken: true,
    };
    this.isAccess = true;
    this.userName = requestBody.emailAdd;
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
        environment.apiKey,
      body
    );
  }

  onLogin(requestBody: any) {
    let body = {
      email: requestBody.emailAdd,
      password: requestBody.password,
      returnSecureToken: true,
    };
    this.isAccess = true;
    this.userName = requestBody.emailAdd;
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
        environment.apiKey,
      body
    );
  }

  async googleSignIn(): Promise<void> {
    try {
      const result = await this.afAuth['signInWithPopup'](new firebase.auth.GoogleAuthProvider());
      this.isAccess = true;
      this.userName = result.user?.displayName || '';
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  }

  logout(): void {
    this.isAccess = false;
    this.userName = '';
  }

  getUserName(): string {
    return this.userName;
  }

  refreshToken(refreshToken: string) {
    const body = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    };
    return this.http.post(
      `https://securetoken.googleapis.com/v1/token?key=${environment.apiKey}`,
      body
    );
  }
}
