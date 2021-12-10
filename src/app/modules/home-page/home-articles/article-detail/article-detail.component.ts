import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ArticlesModel } from 'src/app/models';
import { ArticleStoreService } from 'src/app/services/store/article-store.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css'],
})
export class ArticleDetailComponent implements OnInit {
  @Input() article!: ArticlesModel.Article;
  constructor(
    private articleStore: ArticleStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onFavorite(slug: string) {
    if (this.article?.favorited) {
      console.log(this.article?.favorited)
      this.articleStore.UnfavoriteArticle(slug);
    } else {
      this.articleStore.FavoriteArticle(slug);
      console.log(this.article?.favorited)
    }
  }
  onNavigate() {
    this.router.navigate(['/article', this.article.slug]);
  }
}