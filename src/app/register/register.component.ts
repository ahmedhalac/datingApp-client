import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  @Output() cancelRegister: EventEmitter<boolean> = new EventEmitter();
  model: any = {};

  constructor(private authService: AuthService) {}

  register(): void {
    this.authService.register(this.model).subscribe({
      next: (res) => {
        console.log(res);
        this.cancel();
      },
      error: (error) => console.log(error),
    });
  }

  cancel(): void {
    console.log('cancelled');
    this.cancelRegister.emit(false);
  }
}
