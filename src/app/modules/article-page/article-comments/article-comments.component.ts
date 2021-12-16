import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommentStoreService } from './../../../services/store/comment-store.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ArticlesModel, UserModel } from 'src/app/models';
import { AuthStoreService } from 'src/app/services/store/auth-store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article-comments',
  templateUrl: './article-comments.component.html',
  styleUrls: ['./article-comments.component.css'],
})
export class ArticleCommentsComponent implements OnInit, OnDestroy {
  @Input() isUser: boolean = false;

  commentForm!: FormGroup;
  commentList: ArticlesModel.Comment[] = [];
  slug: string = '';
  isLoaded: boolean = false;
  currentUser: UserModel.User | null = null;

  route$: Subscription | undefined;
  user$: Subscription | undefined;

  constructor(
    private _formBuilder : FormBuilder,
    private commentStore: CommentStoreService,
    private authStore: AuthStoreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user$ = this.authStore.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
    this.route$ = this.route.params.subscribe(data => { 
      this.isLoaded = false;
      this.slug = data['slug'];
      this.commentStore.GetCommentsFromArticle(this.slug);
      this.commentStore.CommentListData.subscribe(commentData => { 
        this.commentList = commentData;
        setTimeout(() => {
          this.isLoaded = true;
        }, 500);
      })
      this.createForm();
    }) 
  }

  createForm() {
    this.commentForm = this._formBuilder.group({
      comment: ['', Validators.required]
    })
  }

  changeSource(event: any) {
    event.target.src = 'https://api.realworld.io/images/smiley-cyrus.jpeg';
  }

  ngOnDestroy() {
    this.route$ ? this.route$.unsubscribe() : '';
    this.user$ ? this.user$.unsubscribe() : '';
  }

  onSubmitComment() {
    this.commentStore.AddCommentsToArticle(this.slug, this.commentForm.value.comment);
    this.commentForm.setValue({
      comment: ''
    })
  }
}
