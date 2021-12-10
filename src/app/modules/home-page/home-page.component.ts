import { Component, OnInit } from '@angular/core';
import { ArticlesModel } from 'src/app/models';
import { ArticleStoreService } from 'src/app/services/store/article-store.service';
import { TagsStoreService } from 'src/app/services/store/tags-store.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  articleList: ArticlesModel.Article[] = [];
  totalArticles: number = 0;
  tagList: string[] = [];

  constructor(
    private tags: TagsStoreService,
    private article: ArticleStoreService
  ) {}

  ngOnInit(): void {
    this.article.GetListArticles({});
    this.article.ArticlesListUpdate.subscribe((articlesData) => {
      this.articleList = articlesData.articles;
      this.totalArticles = articlesData.articlesCount;
    });
  }
}
