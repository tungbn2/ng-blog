import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { MultiArticles } from 'src/app/models/Articles.model';
import { ArticleStoreService } from 'src/app/services/store/article-store.service';

@Component({
  selector: 'app-my-article',
  templateUrl: './my-article.component.html',
  styleUrls: ['./my-article.component.css'],
})
export class MyArticleComponent implements OnInit {
  articleList!: MultiArticles;
  constructor(
    private articleService: ArticleStoreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          if (params['username']) {
            let username = params['username'];
            this.articleService.GetListArticles({ author: username });
          }
          return this.articleService.ArticlesListUpdate;
        }),
        tap((articleListData) => {
          this.articleList = articleListData;
        })
      )
      .subscribe();
  }
}
