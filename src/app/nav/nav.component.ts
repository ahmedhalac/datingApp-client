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
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login(form: NgForm): void {
    this.authService.login(form.value).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigateByUrl('/members');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
