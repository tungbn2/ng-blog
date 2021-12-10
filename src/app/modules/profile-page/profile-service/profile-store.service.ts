import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProfileModel, UserModel, ArticlesModel } from 'src/app/models';
import { ConnectApiService } from '../../../services/connect-api/connect-api.service';
import { switchMap, tap } from 'rxjs/operators';

export interface ProfileWithArticle {
  profile?: ProfileModel.ProfileData;
  articlesByAuthor: ArticlesModel.Article[];
  articlesFavorite: ArticlesModel.Article[];
}
@Injectable({
  providedIn: 'root',
})
export class ProfileStoreService {
  private profile: ProfileModel.ProfileData | null = null;
  private ProfileWithArticle: ProfileWithArticle = {
    articlesByAuthor: [],
    articlesFavorite: [],
  };

  ProfileUpdate = new Subject<ProfileModel.ProfileData>();
  ProfileWithArticleUpdate = new Subject<ProfileWithArticle>();

  constructor(private api: ConnectApiService) {}

  GetProfile(username: string) {
    this.api.GetProfile(username).subscribe((profileData) => {
      this.profile = profileData.profile;
      this.ProfileUpdate.next({ ...this.profile });
    });
  }

  FollowUser(username: string) {
    this.api.PostFollowUser(username).subscribe(
      (profile) => {
        this.profile = profile.profile;
        this.ProfileUpdate.next({ ...this.profile });
      },
      (err) => console.log(err)
    );
  }

  UnfollowUser(username: string) {
    this.api.DeleteUnfollowUser(username).subscribe(
      (profile) => {
        this.profile = profile.profile;
        this.ProfileUpdate.next({ ...this.profile });
      },
      (err) => console.log(err)
    );
  }
}
