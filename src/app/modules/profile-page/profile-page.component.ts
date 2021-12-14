import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { ProfileStoreService } from 'src/app/services/store/profile-store.service';
import { AuthStoreService } from 'src/app/services/store/auth-store.service';
import { ProfileData } from 'src/app/models/Profile.model';
import { User } from 'src/app/models/User.model';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  profileData!: ProfileData;
  currentUser!: User;

  constructor(
    private route: ActivatedRoute,
    private profileStore: ProfileStoreService,
    private authStore: AuthStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          if (params['username']) {
            let username = params['username'];
            this.profileStore.GetProfile(username);
          }
          return this.profileStore.ProfileUpdate;
        }),
        tap((profile) => {
          this.profileData = profile;
        })
      )
      .subscribe();

    this.authStore.currentUser.subscribe((userData) => {
      this.currentUser = userData as User;
    });
  }

  onFollowUser() {
    let user = localStorage.getItem('userBlogData');

    if (!user) {
      this.router.navigateByUrl('/login');
      return;
    }

    if (this.profileData?.following) {
      this.profileStore.UnfollowUser(this.profileData.username);
      return;
    }

    if (this.profileData) {
      this.profileStore.FollowUser(this.profileData.username);
      return;
    }
  }
}
