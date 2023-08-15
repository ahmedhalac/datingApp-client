import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  @Output() cancelRegister: EventEmitter<boolean> = new EventEmitter();
  model: any = {};
  registerForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registerForm = this.formBuilder.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(8)],
      ],
      confirmPassword: [
        '',
        [Validators.required, this.matchValues('password')],
      ],
    });

    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () =>
        this.registerForm.controls['confirmPassword'].updateValueAndValidity(),
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.get(matchTo)?.value
        ? null
        : { isMatching: true };
    };
  }

  register(): void {
    const dob = this.GetDateOnly(
      this.registerForm.controls['dateOfBirth'].value
    );
    const values = {
      ...this.registerForm.value,
      dateOfBirth: this.GetDateOnly(dob),
    };
    this.authService.register(values).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/members');
      },
      error: (error) => console.log(error),
    });
  }

  cancel(): void {
    console.log('cancelled');
    this.cancelRegister.emit(false);
  }

  private GetDateOnly(dob: string | undefined) {
    if (!dob) return;
    let theDob = new Date(dob);
    return new Date(
      theDob.setMinutes(theDob.getMinutes() - theDob.getTimezoneOffset())
    )
      .toISOString()
      .slice(0, 10);
  }
}
