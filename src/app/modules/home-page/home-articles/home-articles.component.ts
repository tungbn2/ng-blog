import { Component, Input, OnInit } from '@angular/core';
import { ArticlesModel } from 'src/app/models';
import { ArticleStoreService } from 'src/app/services/store/article-store.service';

@Component({
  selector: 'app-home-articles',
  templateUrl: './home-articles.component.html',
  styleUrls: ['./home-articles.component.css'],
})
export class HomeArticlesComponent implements OnInit {
  @Input() articleList: ArticlesModel.Article[] = [];

  ngOnInit(): void {}


}