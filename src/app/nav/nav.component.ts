import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  loggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.currentUser$.subscribe({
      next: (user) => (this.loggedIn = !!user),
      error: (err) => console.log(err),
    });
  }

  login(form: NgForm): void {
    this.authService.login(form.value).subscribe({
      next: (res) => {
        console.log(res);
        this.loggedIn = true;
      },
      error: (err) => {
        console.log(err);
        this.loggedIn = false;
      },
    });
  }

  logout(): void {
    this.authService.logout();
    this.loggedIn = false;
  }
}
