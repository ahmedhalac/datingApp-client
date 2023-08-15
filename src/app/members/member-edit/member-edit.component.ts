import { Component, HostListener, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs';
import { Member } from 'src/app/models/member';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent {
  @ViewChild('editForm') editForm: NgForm | undefined;
  //browser popup if user manually enters new url and try to go on the other page
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }
  member: Member | undefined;
  user: User | null | undefined;

  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {
    // take(1) will take the first value and will unsubscribe automatically
    this.authService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => (this.user = user),
      error: (err) => console.log(err),
    });
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    if (!this.user) return;
    this.apiService.getMember(this.user.username).subscribe({
      next: (member) => (this.member = member),
      error: (err) => console.log(err),
    });
  }

  updateMember() {
    this.apiService.updateMember(this.editForm?.value).subscribe({
      next: (_) => {
        this.editForm?.reset(this.member);
      },
      error: (err) => console.log(err),
    });
  }
}
