import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { ProfileData } from 'src/app/models/Profile.model';
import { User } from 'src/app/models/User.model';
import { AuthStoreService } from 'src/app/services/store/auth-store.service';
import { ProfileStoreService } from './profile-service/profile-store.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  profile!: ProfileData;
  currentUser!: User;
  follow: boolean = true;

  constructor(
    private profileService: ProfileStoreService,
    private route: ActivatedRoute,
    private authService: AuthStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          if (params['username']) {
            let username = params['username'];
            this.profileService.GetProfile(username);
          }
          return this.profileService.ProfileUpdate;
        }),
        tap((profile) => {
          this.profile = profile;
        })
      )
      .subscribe();

    this.authService.currentUser.subscribe((data) => {
      this.currentUser = data as User;
    });
  }

  onFollowUser() {
    let user = localStorage.getItem('userBlogData');
    if (!user) {
      this.router.navigateByUrl('/login');
      return;
    }

    if (this.profile.following) {
      this.profileService.UnfollowUser(this.profile.username);
    } else {
      this.profileService.FollowUser(this.profile.username);
    }
  }
}
