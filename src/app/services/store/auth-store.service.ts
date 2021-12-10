import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from 'src/app/models';
import {
  loginData,
  NewUser,
  UpdateUser,
  User,
} from 'src/app/models/User.model';
import { HandleError } from '../connect-api/api-data';
import { ConnectApiService } from '../connect-api/connect-api.service';
import { HandleErrorService } from './handle-error.service';

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  private userData: User | undefined;
  currentUser = new BehaviorSubject<User | null>(null);

  constructor(
    private api: ConnectApiService,
    private handleErr: HandleErrorService,
    private router: Router
  ) {}

  Login(EmailAndPass: UserModel.EmailAndPass) {
    let loginData: UserModel.loginData = { user: EmailAndPass };
    this.api.Login(loginData).subscribe(
      (AuthUser) => {
        this.userData = AuthUser.user;
        this.currentUser.next({ ...this.userData });
        localStorage.setItem('userBlogData', JSON.stringify(AuthUser.user));
        localStorage.setItem(
          'timeToLogin',
          JSON.stringify(new Date().toISOString())
        );
        // this.autoLogout();
        alert('Login success!');
        this.router.navigate(['/']);
      },
      (err: any) => {
        alert('Please check email and password !!!');
      }
    );
  }

  autoLogin() {
    console.log(
      '%c Welcome to Team 1 Blog',
      'font-size: 30px; font-family: serif; color: aqua; '
    );

    if (localStorage.getItem('userBlogData')) {
      const user = JSON.parse(localStorage.getItem('userBlogData') || '');

      this.userData = user;
      this.currentUser.next(user);
      // this.autoLogout();
    } else {
      this.currentUser.next(null);
    }
    return;
  }

  autoLogout() {
    let timeToLogout = new Date(
      JSON.parse(localStorage.getItem('timeToLogin') || '')
    );
    timeToLogout.setMinutes(
      new Date(
        JSON.parse(localStorage.getItem('timeToLogin') || '')
      ).getMinutes() + 10
    );

    let now = new Date();

    if (timeToLogout < now) {
      this.Logout();
    } else {
      let timeWaitToLogout =
        (timeToLogout.getMinutes() - now.getMinutes()) * 60 * 1000;

      console.log(
        `%cAttention: You have ${
          timeToLogout.getMinutes() - now.getMinutes()
        } minutes until to logout !!!`,
        'color:red;font-family:serif; font-size: 25px'
      );

      let autoLogout = setTimeout(() => {
        console.clear();
        let confirmToLogout = confirm(
          'For security purposes, we will automatically log out every 10 minutes. Do you want to extend your login for another 10 minutes?'
        );

        if (confirmToLogout == true) {
          localStorage.setItem(
            'timeToLogin',
            JSON.stringify(new Date().toISOString())
          );
          this.autoLogout();
        } else {
          this.Logout();
        }

        clearTimeout(autoLogout);
      }, timeWaitToLogout);
    }
  }

  Logout() {
    this.router.navigateByUrl('/login');
    localStorage.clear();
    this.currentUser.next(null);
    alert('logout success!');
  }

  Registration(RegisterData: UserModel.RegisterData) {
    let newUser: NewUser = { user: RegisterData };
    this.api.Registration(newUser).subscribe(
      (newUser) => {
        this.userData = newUser.user;
        this.currentUser.next({ ...this.userData });
        localStorage.setItem('userBlogData', JSON.stringify(newUser.user));
        alert('Register success!');
        this.router.navigate(['/']);
      },
      (err) => this.handleErr.HandleError(err)
    );
  }

  GetCurrentUser() {
    this.api.GetCurrentUser().subscribe(
      (authUser) => {
        this.userData = authUser.user;
        this.currentUser.next({ ...this.userData });
      },
      (err) => this.handleErr.HandleError(err)
    );
  }

  UpdateUser(updateUserData: UserModel.UpdateUserData) {
    let updateUser: UserModel.UpdateUser = { user: updateUserData };
    this.api.PutUpdateUser(updateUser).subscribe(
      (AuthUser) => {
        this.userData = AuthUser.user;
        this.currentUser.next({ ...this.userData });
        localStorage.setItem('userBlogData', JSON.stringify(AuthUser.user));
        alert('Update success!');
        this.router.navigate(['/profile', this.userData.username]);
      },
      (err) => this.handleErr.HandleError(err)
    );
  }
}
