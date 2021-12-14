import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { ArticleStoreService } from 'src/app/services/store/article-store.service';
import { MultiArticles } from 'src/app/models/Articles.model';

@Component({
  selector: 'app-list-articles',
  templateUrl: './my-article.component.html',
  styleUrls: ['./my-article.component.css'],
})
export class MyArticleComponent implements OnInit {
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
    this.route.params
      .pipe(
        switchMap((params) => {
          if (params['username']) {
            this.username = params['username'];
            this.articleStore.GetListArticles({
              author: this.username,
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
      author: this.username,
      offset: (this.currentPage - 1) * 20,
      limit: 20,
    });
  }

  onGotoPage(item: number) {
    if (this.currentPage != item) {
      this.currentPage = item;
      this.articleStore.GetListArticles({
        author: this.username,
        offset: (this.currentPage - 1) * 20,
        limit: 20,
      });
    }
  }

  onPrevPage() {
    this.currentPage--;
    this.articleStore.GetListArticles({
      author: this.username,
      offset: (this.currentPage - 1) * 20,
      limit: 20,
    });
  }
}
