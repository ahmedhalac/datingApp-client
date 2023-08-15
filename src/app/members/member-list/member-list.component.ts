import { Component } from '@angular/core';
import { Member } from 'src/app/models/member';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent {
  memebers: Member[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getMembers();
  }

  getMembers(): void {
    this.apiService.getMembers().subscribe({
      next: (res) => (this.memebers = res),
      error: (err) => console.error(err),
    });
  }
}
