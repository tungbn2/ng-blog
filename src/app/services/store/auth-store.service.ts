import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {
  loginData,
  NewUser,
  UpdateUser,
  User,
} from 'src/app/models/User.model';
import { HandleError } from '../connect-api/api-data';
import { ConnectApiService } from '../connect-api/connect-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  private userData: User | undefined;
  currentUser = new BehaviorSubject<User | null>(null);

  constructor(private api: ConnectApiService, private router: Router) {}

  Login(loginData: loginData) {
    this.api.Login(loginData).subscribe(
      (AuthUser) => {
        this.userData = AuthUser.user;
        this.currentUser.next({ ...this.userData });
        localStorage.setItem('userBlogData', JSON.stringify(AuthUser.user));
        alert('Login success!');
        this.router.navigate(['/']);
      },
      (err: any) => {
        alert(err.error.message);
      }
    );
  }

  autoLogin() {
    if (localStorage.getItem('userBlogData')) {
      const user = JSON.parse(localStorage.getItem('userBlogData') || '');
      this.userData = user;
      this.currentUser.next(user);
    } else {
      this.currentUser.next(null);
    }
    return;
  }

  autoLogout() {}

  Logout() {
    this.router.navigateByUrl('/login');
    localStorage.removeItem('userData');
    this.currentUser.next(null);
    alert('logout success!');
  }

  Registration(username: string, email: string, password: string) {
    let newUser: NewUser = { user: { username, email, password } };
    this.api.Registration(newUser).subscribe(
      (newUser) => {
        this.userData = newUser.user;
        this.currentUser.next({ ...this.userData });
        localStorage.setItem('userBlogData', JSON.stringify(newUser.user));
        alert('Login success!');
        this.router.navigate(['/']);
      },
      (err: any) => {
        alert(err.error.message);
      }
    );
  }

  GetCurrentUser() {
    this.api.GetCurrentUser().subscribe(
      (authUser) => {
        this.userData = authUser.user;
        this.currentUser.next({ ...this.userData });
      },
      (err: any) => {
        alert(err.error.message);
      }
    );
  }

  UpdateUser(updateUser: UpdateUser) {
    this.api.PutUpdateUser(updateUser).subscribe();
  }
}
