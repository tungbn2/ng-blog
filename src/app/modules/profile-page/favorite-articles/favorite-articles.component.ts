import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { ArticlesModel } from 'src/app/models';
import { ArticleStoreService } from 'src/app/services/store/article-store.service';

@Component({
  selector: 'app-favorite-articles',
  templateUrl: './favorite-articles.component.html',
  styleUrls: ['./favorite-articles.component.css'],
})
export class FavoriteArticlesComponent implements OnInit {
  articlesList: ArticlesModel.MultiArticles | undefined;
  constructor(
    private route: ActivatedRoute,
    private articleStore: ArticleStoreService
  ) {}

  ngOnInit(): void {
    this.route.params
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
          console.log(articlesListData);
        })
      )
      .subscribe();
  }
}
