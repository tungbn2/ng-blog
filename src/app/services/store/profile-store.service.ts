import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProfileModel, UserModel } from 'src/app/models';
import { ConnectApiService } from '../connect-api/connect-api.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileStoreService {
  private profile: ProfileModel.ProfileData | null = null;

  ProfileData = new BehaviorSubject<ProfileModel.ProfileData | null>(null);

  constructor(private api: ConnectApiService) {}

  GetProfile(username: string) {
    this.api.GetProfile(username).subscribe(
      (profile) => {
        this.profile = profile.profile;
        this.ProfileData.next({ ...this.profile });
      },
      (err) => alert(err.error.message)
    );
  }

  FollowUser(username: string) {
    this.api.PostFollowUser(username).subscribe(
      (profile) => {
        this.profile = profile.profile;
        this.ProfileData.next({ ...this.profile });
      },
      (err) => alert(err.error.message)
    );
  }

  UnfollowUser(username: string) {
    this.api.DeleteUnfollowUser(username).subscribe(
      (profile) => {
        this.profile = profile.profile;
        this.ProfileData.next({ ...this.profile });
      },
      (err) => alert(err.error.message)
    );
  }
}
