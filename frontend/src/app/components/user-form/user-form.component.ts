import { Component, inject } from '@angular/core';
import { NewUser, User, UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

interface AddUserForm {
  username: FormControl<string>;
  email: FormControl<string>;
}

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
  standalone: true,
})
export class UserFormComponent {
  createUserForm = new FormGroup<AddUserForm>({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });

  private userService = inject(UserService);
  private router = inject(Router);

  saveUser(): void {
    if (this.createUserForm.valid) {
      this.userService
        .addUser(this.createUserForm.getRawValue())
        .subscribe(() => {
          this.router.navigate(['/users']);
        });
    } else {
      this.createUserForm.markAllAsTouched();
    }
  }

  goToUserList(): void {
    this.router.navigate(['/users']);
  }
}
