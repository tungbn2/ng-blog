import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ArticleStoreService } from 'src/app/services/store/article-store.service';
import { switchMap, tap } from 'rxjs/operators';
import { ArticlesModel } from 'src/app/models';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.css'],
})
export class EditorPageComponent implements OnInit {
  formEditArticle = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
    tagList: new FormArray([]),
  });

  slug: string = '';

  get tagList() {
    return this.formEditArticle.controls.tagList as FormArray;
  }

  constructor(
    private route: ActivatedRoute,
    private articleStore: ArticleStoreService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          if (params['slug']) {
            this.slug = params['slug'];
            this.articleStore.GetArticle(this.slug);
          }
          return this.articleStore.CurrentArticleUpdate;
        }),
        tap((currentArticle) => {
          console.log(currentArticle);

          let editArticleData = {
            title: currentArticle.title,
            description: currentArticle.description,
            body: currentArticle.body,
          };

          this.formEditArticle.patchValue(editArticleData);

          currentArticle.tagList.forEach((tagItem) => {
            this.addTag(tagItem);
          });
        })
      )
      .subscribe();
  }

  addTag(tagName: string) {
    this.tagList.controls.push(new FormControl(tagName));
    console.log(this.tagList);
  }

  onSubmit(tagList: string) {
    tagList.split(',').forEach((tagName) => {
      if (tagName) this.addTag(tagName);
    });

    let tagListValue = this.tagList.controls.map((item) => item.value);

    let articleData: ArticlesModel.ArticleData = {
      ...this.formEditArticle.value,
      tagList: tagListValue,
    };
    console.log(articleData);

    if (this.slug) {
      this.articleStore.UpdateArticle(articleData, this.slug);
    } else {
      this.articleStore.CreateArticle(articleData);
    }
  }
}
