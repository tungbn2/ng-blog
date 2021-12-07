import { Component, OnInit } from '@angular/core';
import { ProfileStoreService } from 'src/app/services/store/profile-store.service';
import { TagsStoreService } from 'src/app/services/store/tags-store.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private tags: TagsStoreService,
    private profile: ProfileStoreService
  ) {}

  ngOnInit(): void {
    this.profile.GetProfile('Gerome');
    this.profile.ProfileWithArticleUpdate.subscribe((data) => {
      console.log(data);
    });
  }
}
