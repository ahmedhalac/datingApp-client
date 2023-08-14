import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  registerMode = false;
  users: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

  getUsers(): void {
    this.apiService.getUsers().subscribe({
      next: (response) => {
        this.users = response;
        console.log(response);
      },
      error: (error) => console.error(error),
    });
  }

  onCancelRegister(event: boolean): void {
    this.registerMode = event;
  }
}
