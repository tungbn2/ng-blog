import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { MultiArticles } from 'src/app/models/Articles.model';
import { ArticleStoreService } from 'src/app/services/store/article-store.service';

@Component({
  selector: 'app-favorite-articles',
  templateUrl: './favorite-article.component.html',
  styleUrls: ['./favorite-article.component.css'],
})
export class FavoriteArticleComponent implements OnInit {
  articlesList!: MultiArticles;

  constructor(
    private route: ActivatedRoute,
    private articleStore: ArticleStoreService
  ) {}

  ngOnInit(): void {
    this.route.parent?.params
      .pipe(
        switchMap((params) => {
          if (params['username']) {
            let username = params['username'];
            this.articleStore.GetListArticles({ favorited: username });
          }
          return this.articleStore.ArticlesListUpdate;
        }),
        tap((articlesListData) => {
          this.articlesList = articlesListData;
        })
      )
      .subscribe();
  }
}
