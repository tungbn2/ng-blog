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
  username: string = '';
  isLoaded: boolean = false;

  currentPage: number = 1;
  pageList: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private articleStore: ArticleStoreService
  ) {}

  ngOnInit(): void {
    this.route.parent?.params
      .pipe(
        switchMap((params) => {
          if (params['username']) {
            this.username = params['username'];
            this.articleStore.GetListArticles({
              favorited: this.username,
              offset: 0,
              limit: 20,
            });
          }
          return this.articleStore.ArticlesListUpdate;
        }),
        tap((articlesListData) => {
          this.articlesList = articlesListData;
          this.isLoaded = true;

          this.pageList = [];
          let total = Math.ceil(articlesListData.articlesCount / 20);
          for (let i = 1; i <= total; i++) {
            this.pageList.push(i);
          }
        })
      )
      .subscribe();
  }

  onNextPage() {
    this.currentPage++;
    this.articleStore.GetListArticles({
      favorited: this.username,
      offset: (this.currentPage - 1) * 20,
      limit: 20,
    });
  }

  onPrevPage() {
    this.currentPage--;
    this.articleStore.GetListArticles({
      favorited: this.username,
      offset: (this.currentPage - 1) * 20,
      limit: 20,
    });
  }

  onGotoPage(item: number) {
    if (this.currentPage != item) {
      this.currentPage = item;
      this.articleStore.GetListArticles({
        favorited: this.username,
        offset: (this.currentPage - 1) * 20,
        limit: 20,
      });
    }
  }
}
