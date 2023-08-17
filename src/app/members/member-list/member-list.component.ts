import { Component } from '@angular/core';
import { take } from 'rxjs';
import { Member } from 'src/app/models/member';
import { Pagination } from 'src/app/models/pagination';
import { User } from 'src/app/models/user';
import { UserParams } from 'src/app/models/userParams';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent {
  memebers: Member[] = [];
  pagination: Pagination | undefined;
  userParams: UserParams | undefined;
  user: User | undefined;
  genderList = [
    { value: 'male', display: 'Males' },
    { value: 'female', display: 'Females' },
  ];

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {
    this.authService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if (user) {
          this.userParams = new UserParams(user);
          this.user = user;
        }
      },
    });
  }

  ngOnInit(): void {
    this.getMembers();
  }

  getMembers(): void {
    if (!this.userParams) return;
    this.apiService.getMembers(this.userParams).subscribe({
      next: (res) => {
        if (res.result && res.pagination) {
          this.memebers = res.result as Member[];
          this.pagination = res.pagination;
        }
      },
      error: (err) => console.error(err),
    });
  }

  pageChanged(event: any) {
    if (this.userParams && this.userParams?.pageNumber !== event.page) {
      this.userParams.pageNumber = event.page;
      this.getMembers();
    }
  }

  resetFilters() {
    if (this.user) {
      this.userParams = new UserParams(this.user);
      this.getMembers();
    }
  }
}
