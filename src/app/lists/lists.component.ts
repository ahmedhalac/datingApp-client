import { Component } from '@angular/core';
import { Member } from '../models/member';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent {
  members: Member[] | undefined;
  predicate = 'liked';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes() {
    this.apiService.getLikes(this.predicate).subscribe({
      next: (response) => {
        this.members = response;
      },
    });
  }
}
