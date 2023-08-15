import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { Member } from 'src/app/models/member';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  standalone: true,
  styleUrls: ['./member-detail.component.css'],
  imports: [CommonModule, TabsModule, GalleryModule],
})
export class MemberDetailComponent {
  member: Member | undefined;
  images: GalleryItem[] = [];

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    const username = this.route.snapshot.params['username'];
    if (!username) return;
    this.apiService.getMember(username).subscribe({
      next: (res) => {
        this.member = res;
        this.getImages();
      },
      error: (err) => console.log(err),
    });
  }

  getImages() {
    if (!this.member) return;
    for (const photo of this.member?.photos) {
      this.images.push(new ImageItem({ src: photo.url, thumb: photo.url }));
    }
  }
}
