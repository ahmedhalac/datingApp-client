import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  loggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

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
        this.router.navigateByUrl('/members');
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
