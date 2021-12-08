import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { ProfileStoreService } from 'src/app/services/store/profile-store.service';
import { ProfileModel } from 'src/app/models';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  profileData: ProfileModel.ProfileData | undefined;

  constructor(
    private route: ActivatedRoute,
    private profileStore: ProfileStoreService
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
  }
}
