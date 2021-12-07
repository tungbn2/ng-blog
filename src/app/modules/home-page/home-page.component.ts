import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { TagsStoreService } from 'src/app/services/store/tags-store.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(private tags: TagsStoreService) {}

  ngOnInit(): void {
    this.tags.GetTags();
    this.tags.TagsListData.subscribe((data) => {
      console.log(data);
    });
  }
}
