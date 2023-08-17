import { Component, Input } from '@angular/core';
import { Member } from 'src/app/models/member';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent {
  @Input() member: Member | undefined;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  addLike(member: Member) {
    this.apiService.addLike(member.userName).subscribe({
      next: () => console.log('You have likes'),
    });
  }
}
