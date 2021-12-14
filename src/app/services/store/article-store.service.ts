import { Profile } from './../../models/Profile.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ArticlesModel, OtherModel, ProfileModel } from 'src/app/models';
import { ConnectApiService } from '../connect-api/connect-api.service';
import { switchMap, tap } from 'rxjs/operators';
import { HandleErrorService } from './handle-error.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ArticleStoreService {
  private ArticlesList: ArticlesModel.MultiArticles = {
    articles: [],
    articlesCount: 0,
  };
  // Khai báo biến để cập nhật Article mỗi khi có sự thay đổi
  private CurrentArticle: ArticlesModel.Article | null = null;
  // Khai báo biến để cập nhật Profile và article mỗi khi có sự thay đổi
  private CurrentArticleAndProfile: ArticlesModel.CurrentArticleAndProfile | null =
    null;

  ArticlesListUpdate = new Subject<ArticlesModel.MultiArticles>();
  CurrentArticleUpdate = new Subject<ArticlesModel.Article>();
  CurrentArticleAndProfileUpdate = new Subject<ArticlesModel.CurrentArticleAndProfile>();

  constructor(
    private api: ConnectApiService,
    private handleErr: HandleErrorService,
    private router: Router
  ) {}

  GetListArticles(params: OtherModel.getArticleParam) {
    this.api.GetListArticles(params).subscribe(
      (articlesData) => {
        this.ArticlesList = articlesData;
        this.ArticlesListUpdate.next({ ...this.ArticlesList });
      },
      (err) => this.handleErr.HandleError(err)
    );
  }

  GetFeedArticles() {
    this.api.GetFeedArticles().subscribe(
      (articlesData) => {
        this.ArticlesList = articlesData;
        this.ArticlesListUpdate.next({ ...this.ArticlesList });
      },
      (err) => this.handleErr.HandleError(err)
    );
  }

  GetArticle(slug: string) {
    this.api.GetArticleBySlug(slug).subscribe(
      (articleData) => {
        this.CurrentArticle = articleData.article;
        this.CurrentArticleUpdate.next({ ...this.CurrentArticle });
      },
      (err) => this.handleErr.HandleError(err)
    );
  }

  GetArticleAndProfile(slug: string) {
    this.api
      .GetArticleBySlug(slug)
      .pipe(
        switchMap((articleData) => {
          // articleData lưu trữ data article được call từ API
          this.CurrentArticle = articleData.article;
          let username: string = articleData.article.author.username;
          return this.api.GetProfile(username);
        }),
        tap((author) => {
          // author lưu trữ profile mà được call từ API thông qua username
          this.CurrentArticle
            ? (this.CurrentArticleAndProfile = { 
                author: author.profile,
                currentArticle: this.CurrentArticle, 
              })
            : '';
          // Khi this.CurrentArticleAndProfile tồn tại thì this.CurrentArticleAndProfileUpdate sẽ lưu giá trị mới
          this.CurrentArticleAndProfile
            ? this.CurrentArticleAndProfileUpdate.next({
                ...this.CurrentArticleAndProfile,
              })
            : '';
        })
      )
      .subscribe(
        () => {},
        (err) => this.handleErr.HandleError(err)
      );
  }

  CreateArticle(newArticleData: ArticlesModel.ArticleData) {
    let newArticle: ArticlesModel.NewArticle = { article: newArticleData };
    this.api.PostCreateArticle(newArticle).subscribe(
      (articleData) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Create Article Successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['/']);
      },
      (err) => this.handleErr.HandleError(err)
    );
  }

  UpdateArticle(updateArticleData: ArticlesModel.ArticleData, slug: string) {
    let updateArticle: ArticlesModel.UpdateArticle = {
      article: updateArticleData,
    };
    this.api.PutUpdateArticle(updateArticle, slug).subscribe(
      (articleData) => {
        this.CurrentArticle = articleData.article;
        this.CurrentArticleUpdate.next({ ...this.CurrentArticle });
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Update Article Successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['/article', slug]);
      },
      (err) => this.handleErr.HandleError(err)
    );
  }

  DeleteArticle(slug: string) {
    this.api.DeleteArticle(slug).subscribe(
      () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Delete article successfully!!!',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigateByUrl('/');
      },
      (err) => this.handleErr.HandleError(err)
    );
  }

  FavoriteArticle(slug: string) {
    this.api.PostFavoriteArticle(slug).subscribe(
      (favoriteArticle) => {
        // Cập nhật lại article cho CurrentArticle
        console.log(favoriteArticle);
        this.CurrentArticle = favoriteArticle.article;
        // this.ArticlesList.articles ban đầu là rỗng
        console.log(this.ArticlesList.articles);
        // Cái này chỉ dùng cho khi đi từ trang home vào article nếu chỉ reload lại thì giá trị là 0
        this.ArticlesList.articles.forEach((item) => {
          if (item.slug == favoriteArticle.article.slug) {
            item.favorited = favoriteArticle.article.favorited;
            item.favoritesCount = favoriteArticle.article.favoritesCount;
          }
        });
        // Cập nhật data với favorite mới vào CurrentArticleUpdate
        this.CurrentArticleUpdate.next({ ...this.CurrentArticle });
        // Cập nhật giá trị mới cho cho this.CurrentArticleAndProfileUpdate
        if (this.CurrentArticleAndProfile)
          this.CurrentArticleAndProfileUpdate.next({
            ...this.CurrentArticleAndProfile,
            currentArticle: this.CurrentArticle,
          });
        console.log(this.ArticlesList);
        // Cập nhật lại giá trị 
        this.ArticlesListUpdate.next({ ...this.ArticlesList });
      },
      (err) => this.handleErr.HandleError(err)
    );
  }

  UnfavoriteArticle(slug: string) {
    this.api.DeleteUnfavoriteArticle(slug).subscribe(
      (unfavoriteArticle) => {
        console.log(unfavoriteArticle);
        // Cập nhật lại article cho CurrentArticle
        this.CurrentArticle = unfavoriteArticle.article;
        console.log(this.ArticlesList);
        // Cái này chỉ dùng cho khi đi từ trang home vào article nếu chỉ reload lại thì giá trị là 0
        this.ArticlesList.articles.forEach((item) => {
          if (item.slug == unfavoriteArticle.article.slug) {
            item.favorited = unfavoriteArticle.article.favorited;
            item.favoritesCount = unfavoriteArticle.article.favoritesCount;
          }
        });

        this.CurrentArticleUpdate.next({ ...this.CurrentArticle });
        if (this.CurrentArticleAndProfile)
          this.CurrentArticleAndProfileUpdate.next({
            ...this.CurrentArticleAndProfile,
            currentArticle: this.CurrentArticle,
          });
        console.log(this.ArticlesList);
        // Cập nhật lại giá trị 
        this.ArticlesListUpdate.next({ ...this.ArticlesList });
      },
      (err) => this.handleErr.HandleError(err)
    );
  }

  // Hàm xử lý unfollowing
  FollowUserFromArticle(username: string) {
    this.api.PostFollowUser(username).subscribe(
      (profile) => {
        if (this.CurrentArticleAndProfile) {
          // Cập nhật lại author chứa profile thành profile mới sau khi thay đổi following sang true
          this.CurrentArticleAndProfile.author = profile.profile;
          this.CurrentArticleAndProfileUpdate.next({
            ...this.CurrentArticleAndProfile,
          });
        }
      },
      (err) => this.handleErr.HandleError(err)
    );
  }

   // Hàm xử lý unfollowing
  UnFollowUserFromArticle(username: string) {
    this.api.DeleteUnfollowUser(username).subscribe(
      (profile) => {
        if (this.CurrentArticleAndProfile) {
          console.log(profile);
          // Cập nhật lại author chứa profile thành profile mới sau khi thay đổi following sang false
          this.CurrentArticleAndProfile.author = profile.profile;
          this.CurrentArticleAndProfileUpdate.next({
            ...this.CurrentArticleAndProfile,
          });
        }
      },
      (err) => this.handleErr.HandleError(err)
    );
  }
}
