import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { ArticlesModel, UserModel } from 'src/app/models';
import { ArticleStoreService } from 'src/app/services/store/article-store.service';
import { AuthStoreService } from 'src/app/services/store/auth-store.service';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.css'],
})
export class ArticlePageComponent implements OnInit {
  articleData: ArticlesModel.CurrentArticleAndProfile | null = null;
  currentUser: UserModel.User | null = null;
  slug: string = '';
  isLoaded = false;

  constructor(
    private auth: AuthStoreService,
    private article: ArticleStoreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.auth.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
    this.route.params
      .pipe(
        switchMap((params) => {
          this.isLoaded = false;
          this.slug = params['slug'];
          this.article.GetArticleAndProfile(this.slug);
          return this.article.CurrentArticleAndProfileUpdate;
        }),
        tap((articleAndProfile) => {
          console.log(articleAndProfile);

          this.isLoaded = true;
          this.articleData = articleAndProfile;
        })
      )
      .subscribe();
  }
}
